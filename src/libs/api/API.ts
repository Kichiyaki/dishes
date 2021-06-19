import { AddDishPayload } from './types';

export class API {
  constructor(private apiURL: string) {}

  public addDish(payload: AddDishPayload) {
    return fetch(this.apiURL + '/dishes', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
