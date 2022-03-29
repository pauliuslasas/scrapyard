import * as faker from 'faker';
import * as Knex from 'knex';

import { PART_TYPES } from '../../constants/part';

const createFakeData = () => ({
  name: faker.vehicle.model(),
  type: Object.keys(PART_TYPES)[Math.floor(Math.random() * Object.keys(PART_TYPES).length)],
  age: 0,
  rustiness: 0,
  quality: 100,
  price: faker.datatype.number({ min: 80, max: 120 }),
});

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('ScrapParts').del();

  await knex('ScrapParts').truncate();

  for (let x = 0; x < 2; x++) {
    const fakeData = [];
    for (let i = 0; i < 5; i++) {
      fakeData.push(createFakeData());
    }
    await knex('ScrapParts').insert(fakeData);
  }
}
