/**
 *
 * @param places
 * @return {{latitude: number, longitude: number}}
 */
export const getCenterPosition = (places = []) => {
  if (!places.length) {
    return {
      latitude: 0,
      longitude: 0
    };
  }
  let minLatitude = Math.min(...places.map(({ latitude }) => latitude));
  let maxLatitude = Math.max(...places.map(({ latitude }) => latitude));
  let minLongitude = Math.min(...places.map(({ longitude }) => longitude));
  let maxLongitude = Math.max(...places.map(({ longitude }) => longitude));

  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2
  };
};

/**
 *
 * @param places
 * @return {*[][]}
 */
export const toArray = (places = []) => {
  return places.map(({ latitude, longitude }) => [longitude, latitude]);
};
