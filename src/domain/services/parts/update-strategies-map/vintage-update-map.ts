import { IPart } from '../../../../typings/interfaces/part-interface';

export function vintagePartMutator(part: IPart, season: number): IPart {
  const vintageRustIntensity = season + 2;

  // Updating age

  part.age = part.age + 1;

  // Updating rustiness

  if (part.rustiness + vintageRustIntensity >= 100) {
    part.rustiness = 100;
  } else {
    part.rustiness = part.rustiness + vintageRustIntensity;
  }

  // Updating quality

  if (part.quality - (vintageRustIntensity * 70) / 100 <= 0) {
    part.quality = 0;
  } else {
    part.quality = part.quality - (vintageRustIntensity * 70) / 100;
    part.quality = Math.round(part.quality * 100) / 100;
  }

  // Updating price

  if (part.age >= 10) {
    if (part.price + (part.price * 10) / 100 >= 200) {
      part.price = 200;
    } else {
      part.price = Math.round((part.price + (part.price * 10) / 100) * 100) / 100;
    }
  } else {
    part.price = Math.round((part.price - (part.price * 3) / 100) * 100) / 100;
  }
  return part;
}
