import {
  PartUpdate,
  partUpdaterMap,
} from '../../../../../../src/domain/services/parts/update-strategies-map/part-update-logic';
import { IPart } from '../../../../../../src/typings/interfaces/part-interface';

describe('Plastic part update', () => {
  let update: PartUpdate, part: IPart, season: number;
  beforeEach(() => {
    update = new PartUpdate(partUpdaterMap);
    season = 4;
    part = {
      name: 'plastic',
      type: 'PLASTIC',
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
  test('Rust should increase by 5, when winter is picked on metal part ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.rustiness).toEqual(5);
  });
  test('Rustiness should never exceed 100 ', () => {
    // ARANGE
    part.rustiness = 99;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.rustiness).toEqual(100);
  });
  test('Quality should decrease by 3.5, when winter is picked on metal part ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.quality).toEqual(46.5);
  });
  test('Quality should never go below 0 ', () => {
    // ARANGE
    part.quality = 1;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.quality).toEqual(0);
  });
  test('Price should decrease by 5%, when part quality is > 40 ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(95);
  });
  test('Price should decrease by 10%, when part quality is < 40 ', () => {
    // ARANGE
    part.quality = 10;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(90);
  });
  test('Quality and price should drop to 0 when part age is >= 20 ', () => {
    // ARANGE
    part.age = 20;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.quality).toEqual(0);
    expect(part.price).toEqual(0);
  });
});
