import * as position from '../utils/position';

/**
 *
 * @param places
 * @return {{lng: number, lat: number}}
 */
export const getCenterPosition = (places = []) => {
  const centerPosition = position.getCenterPosition(places);
  return {
    lat: centerPosition.latitude,
    lng: centerPosition.longitude
  };
};

/**
 *
 * @param places
 * @return {*[][]}
 */
export const toArray = (places = []) => {
  return places.map(({ latitude, longitude }) => [latitude, longitude]);
};
