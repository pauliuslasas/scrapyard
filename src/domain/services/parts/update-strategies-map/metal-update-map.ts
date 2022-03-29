import { IPart } from '../../../../typings/interfaces/part-interface';

export function metalPartMutator(part: IPart, season: number): IPart {
  const metalRustIntensity = season + 3;

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

  if (part.rustiness + metalRustIntensity >= 100) {
    part.rustiness = 100;
  } else {
    part.rustiness = part.rustiness + metalRustIntensity;
  }

  // Updating quality

  if (part.quality - (metalRustIntensity * 70) / 100 <= 0) {
    part.quality = 0;
  } else {
    part.quality = part.quality - (metalRustIntensity * 70) / 100;
    part.quality = Math.round(part.quality * 100) / 100;
  }

  // Updating price

  if (part.quality < 40) {
    part.price = part.price - (part.price * 10) / 100;
    part.price = Math.round(part.price * 100) / 100;
  } else {
    part.price = part.price - (part.price * 7) / 100;
    part.price = Math.round(part.price * 100) / 100;
  }
  return part;
}
