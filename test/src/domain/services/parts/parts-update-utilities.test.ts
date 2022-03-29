import {
  getRandomSeason,
  getRustIntensityBySeason,
} from '../../../../../src/domain/services/parts/part-update-utilites';
import { Seasons } from '../../../../../src/typings/enums/season-enum';

describe('Update utilites test', () => {
  test('Rust intensity should return 3 if autumn is picked ', () => {
    // ARANGE
    // ACT
    const seasonRustIntensity = getRustIntensityBySeason(Seasons.Autumn);
    // ASSERT
    expect(seasonRustIntensity).toBe(3);
  });
  test('Random season is picked from the list ', () => {
    // ARANGE
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0;
    global.Math = mockMath;
    // ACT
    const season = getRandomSeason();
    // ASSERT
    expect(season).toBe('summer');
  });
});
