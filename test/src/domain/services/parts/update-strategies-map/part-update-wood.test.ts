import {
  PartUpdate,
  partUpdaterMap,
} from '../../../../../../src/domain/services/parts/update-strategies-map/part-update-logic';
import { IPart } from '../../../../../../src/typings/interfaces/part-interface';

describe('Wood part update', () => {
  let update: PartUpdate, part: IPart, season: number;
  beforeEach(() => {
    update = new PartUpdate(partUpdaterMap);
    season = 4;
    part = {
      name: 'wood',
      type: 'WOOD',
      age: 1,
      rustiness: 0,
      quality: 50,
      price: 100,
    };
  });
  test('Age should increase by 1 ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.age).toEqual(2);
  });
  test('Rust should increase by 6, when winter is picked on wood part ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.rustiness).toEqual(6);
  });
  test('Rustiness should never exceed 100 ', () => {
    // ARANGE
    part.rustiness = 99;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.rustiness).toEqual(100);
  });
  test('Quality should decrease by 4.2, when winter is picked on wood part ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.quality).toEqual(45.8);
  });
  test('Quality should never go below 0 ', () => {
    // ARANGE
    part.quality = 1;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.quality).toEqual(0);
  });
  test('Price should decrease by 4%, when part quality is > 40 ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(96);
  });
  test('Price should decrease by 10%, when part quality is < 40 ', () => {
    // ARANGE
    part.quality = 15;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(90);
  });
  test('Quality and price should drop to 0 when part age is >= 20 ', () => {
    // ARANGE
    part.age = 22;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.quality).toEqual(0);
    expect(part.price).toEqual(0);
  });
});
