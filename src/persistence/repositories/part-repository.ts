import { ModelClass } from 'objection';

import { AppError } from '../../app-error';
import { PartType } from '../../typings/types/parts';
import { Part } from '../models/part-model';

export class PartRepository {
  constructor(private model: ModelClass<Part>) {}

  async findAll(): Promise<Part[]> {
    const parts = await this.model.query().where('age', '<', 20);
    return parts;
  }

  async findOne(id: number): Promise<Part> {
    const part = await this.model.query().findById(id);
    if (!part) {
      throw new AppError(404, `Part not found with id: ${id}`);
    }
    return part;
  }

  async update(parts: Part[]): Promise<void> {
    await this.model.transaction(async (trx) => {
      try {
        const promises = [];

        for (const part of parts) {
          promises.push(
            this.model.query().transacting(trx).patch({ age: part.age }).where('name', '=', part.name),
            this.model.query().transacting(trx).patch({ rustiness: part.rustiness }).where('name', '=', part.name),
            this.model.query().transacting(trx).patch({ quality: part.quality }).where('name', '=', part.name),
            this.model.query().transacting(trx).patch({ price: part.price }).where('name', '=', part.name),
          );
        }
        await Promise.all(promises);
        await trx.commit();
      } catch {
        await trx.rollback();
      }
    });
  }
  async addOne(
    partName: string,
    partTypeFromRequest: PartType,
    partAge: number,
    partRustiness: number,
    partQuality: number,
    partPrice: number,
  ): Promise<void> {
    await this.model.query().insert({
      name: partName,
      type: partTypeFromRequest,
      age: partAge,
      rustiness: partRustiness,
      quality: partQuality,
      price: partPrice,
    });
  }
}
