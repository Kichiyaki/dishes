import { isPlainObject, pick } from 'lodash';
import { CreateDishPayload, DishType } from './types';

export class APIError extends Error {
  constructor(
    public message: string,
    public objWithErrors: { [key: string]: string }
  ) {
    super(message);
  }
}

export class API {
  private static sanitizeCreateDishPayload(payload: CreateDishPayload) {
    if (!isPlainObject(payload)) {
      return {};
    }
    let fields = ['type', 'name', 'preparation_time'];
    switch (payload.type) {
      case DishType.Pizza:
        fields = [...fields, 'no_of_slices', 'diameter'];
        break;
      case DishType.Soup:
        fields = [...fields, 'spiciness_scale'];
        break;
      case DishType.Sandwich:
        fields = [...fields, 'slices_of_bread'];
        break;
    }
    return pick(payload, fields);
  }

  constructor(private apiURL: string) {}

  public async createDish(payload: CreateDishPayload) {
    const res = await fetch(this.apiURL + '/dishes', {
      method: 'POST',
      body: JSON.stringify(API.sanitizeCreateDishPayload(payload)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status >= 400) {
      const errObj = await res.json();
      throw new APIError(
        'Something went wrong while creating a dish. Please try again later.',
        isPlainObject(errObj) ? errObj : {}
      );
    }
  }
}
