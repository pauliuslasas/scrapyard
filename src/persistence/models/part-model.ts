import { IPart } from '../../typings/interfaces/part-interface';
import { PartType } from '../../typings/types/parts';
import { Model } from '../database';

export class Part extends Model implements IPart {
  name: string;
  type: PartType;
  age: number;
  rustiness: number;
  quality: number;
  price: number;

  static get tableName(): string {
    return 'ScrapParts';
  }
}
