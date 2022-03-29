import {
  PartUpdate,
  partUpdaterMap,
} from '../../../../../../src/domain/services/parts/update-strategies-map/part-update-logic';
import { IPart } from '../../../../../../src/typings/interfaces/part-interface';

describe('Vintage part update', () => {
  let update: PartUpdate, part: IPart, season: number;
  beforeEach(() => {
    update = new PartUpdate(partUpdaterMap);
    season = 4;
    part = {
      name: 'vintage',
      type: 'VINTAGE',
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
  test('Rust should increase by 6, when winter is picked on vintage part ', () => {
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
  test('Quality should decrease by 4.2, when winter is picked on vintage part ', () => {
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
  test('Price should decrease by 3%, when part quality is > 40 ', () => {
    // ARANGE
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(97);
  });
  test('Price should increase by 10%, when vintage part age > 10 ', () => {
    // ARANGE
    part.age = 11;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(110);
  });
  test('Price should never exceed 200 ', () => {
    // ARANGE
    part.age = 15;
    part.price = 198;
    // ACT
    update.updatePart(part, season);
    // ASSERT
    expect(part.price).toEqual(200);
  });
});
