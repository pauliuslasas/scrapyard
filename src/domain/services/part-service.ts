import Logger from '../../logger';
import { Part } from '../../persistence/models/part-model';
import { PartRepository } from '../../persistence/repositories/part-repository';
import { PartType } from '../../typings/types/parts';
import { getRandomSeason, getRustIntensityBySeason } from './parts/part-update-utilites';
import { PartUpdate, partUpdaterMap } from './parts/update-strategies-map/part-update-logic';

export class PartService {
  constructor(private partRepository: PartRepository) {}

  async getSinglePart(id: number): Promise<Part> {
    return await this.partRepository.findOne(id);
  }

  async getAllParts(): Promise<Part[]> {
    return await this.partRepository.findAll();
  }

  async update(): Promise<void> {
    const parts = await this.partRepository.findAll();
    const updater = new PartUpdate(partUpdaterMap);
    const season = getRandomSeason();
    const seasonRustIntensity = getRustIntensityBySeason(season);
    if (seasonRustIntensity === 0) {
      Logger.warn('Unhandled season');
    } else {
      for (const part of parts) {
        updater.updatePart(part, seasonRustIntensity);
      }
      await this.partRepository.update(parts);
    }
  }

  async addPart(
    partName: string,
    partType: PartType,
    partAge: number,
    partRustiness: number,
    partQuality: number,
    partPrice: number,
  ): Promise<void> {
    await this.partRepository.addOne(partName, partType, partAge, partRustiness, partQuality, partPrice);
  }
}
