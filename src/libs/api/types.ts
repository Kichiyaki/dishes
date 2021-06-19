export enum DishType {
  Pizza = 'pizza',
  Soup = 'soup',
  Sandwich = 'sandwich',
}

export type CreateDishPayload = {
  type: DishType;
  name: string;
  preparation_time: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
};
