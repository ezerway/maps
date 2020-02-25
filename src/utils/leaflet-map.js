import * as position from '../utils/position';

/**
 *
 * @param places
 * @return {number[]}
 */
export const getCenterPosition = (places = []) => {
  const centerPosition = position.getCenterPosition(places);
  return [centerPosition.latitude, centerPosition.longitude];
};

/**
 *
 * @param places
 * @return {*[][]}
 */
export const toArray = (places = []) => {
  return places.map(({ latitude, longitude }) => [latitude, longitude]);
};
