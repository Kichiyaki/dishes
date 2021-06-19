import { Mark } from '@material-ui/core/Slider/Slider';

export enum DishType {
  Pizza = 'pizza',
  Soup = 'soup',
  Sandwich = 'sandwich',
}
export const TYPES = Object.entries(DishType);

export const MIN_SPICINESS_SCALE = 1;
export const MAX_SPICINESS_SCALE = 10;
const generateMarks = () => {
  const marks: Mark[] = [];
  for (let i = MIN_SPICINESS_SCALE; i <= MAX_SPICINESS_SCALE; i++) {
    marks.push({
      value: i,
      label: i,
    });
  }
  return marks;
};
export const MARKS = generateMarks();
