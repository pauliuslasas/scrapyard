import { IPart } from '../../../../typings/interfaces/part-interface';

export function rubberPartMutator(part: IPart, season: number): IPart {
  const rubberRustIntensity = season + 1;

  // Updating age

  if (part.age + 1 >= 20) {
    part.age = 20;
    part.quality = 0;
    part.price = 0;
    return;
  } else {
    part.age = part.age + 1;
  }

  // Updating rustiness

  if (part.rustiness + rubberRustIntensity >= 100) {
    part.rustiness = 100;
  } else {
    part.rustiness = part.rustiness + rubberRustIntensity;
  }

  // Updating quality

  if (part.quality - (rubberRustIntensity * 70) / 100 <= 0) {
    part.quality = 0;
  } else {
    part.quality = part.quality - (rubberRustIntensity * 70) / 100;
    part.quality = Math.round(part.quality * 100) / 100;
  }

  // Updating price

  if (part.quality < 40) {
    part.price = part.price - (part.price * 10) / 100;
    part.price = Math.round(part.price * 100) / 100;
  } else {
    part.price = part.price - (part.price * 6) / 100;
    part.price = Math.round(part.price * 100) / 100;
  }
  return part;
}
