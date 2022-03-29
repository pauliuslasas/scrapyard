import { PartType } from '../types/parts';

export interface IPart {
  name: string;
  type: PartType;
  age: number;
  rustiness: number;
  quality: number;
  price: number;
}
