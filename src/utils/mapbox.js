import { toArray } from './position';
import mapboxgl from 'mapbox-gl';

/**
 *
 * @param places
 * @return {Array<Array<number>>}
 */
export const toBounds = (places = []) => {
  const coordinates = toArray(places);
  const bounds = coordinates.reduce(function(bounds, coord) {
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  return bounds.toArray();
};
