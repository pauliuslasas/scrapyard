import { IPart } from '../../../../typings/interfaces/part-interface';
import { PartType } from '../../../../typings/types/parts';
import { metalPartMutator } from './metal-update-map';
import { plasticPartMutator } from './plastic-update-map';
import { rubberPartMutator } from './rubber-update-map';
import { vintagePartMutator } from './vintage-update-map';
import { woodPartMutator } from './wood-update-map';

type PartMutator = (part: IPart, season: number) => void;

export class PartUpdate {
  constructor(private partMutatorRecord: Record<PartType, PartMutator>) {}

  updatePart(part: IPart, season: number): void {
    const updater = this.partMutatorRecord[part.type];
    return updater ? updater(part, season) : null;
  }
}

export const partUpdaterMap: Record<PartType, PartMutator> = {
  METAL: metalPartMutator,
  PLASTIC: plasticPartMutator,
  RUBBER: rubberPartMutator,
  VINTAGE: vintagePartMutator,
  WOOD: woodPartMutator,
};
