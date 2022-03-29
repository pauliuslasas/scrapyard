import Logger from '../../../logger';
import { Seasons } from '../../../typings/enums/season-enum';

export const getRustIntensityBySeason = (season: Seasons): number => {
  const defaultRustiness = 0;
  const seasonRustinessMap = { [Seasons.Summer]: 1, [Seasons.Spring]: 2, [Seasons.Autumn]: 3, [Seasons.Winter]: 4 };
  return seasonRustinessMap[season] ?? defaultRustiness;
};

export const getRandomSeason = (): Seasons => {
  const values = Object.values(Seasons);
  const randomIndex = Math.floor(Math.random() * values.length);
  Logger.info('Season picked:  ' + values[randomIndex]);
  return values[randomIndex];
};
