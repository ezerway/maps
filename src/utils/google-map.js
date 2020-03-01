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

/**
 * Return map bounds based on list of places
 *
 * @param map
 * @param maps
 * @param places
 * @return {maps}
 */
export function getMapBounds(map, maps, places) {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place.latitude, place.longitude));
  });
  return bounds;
}

/**
 * Re-center map when resizing the window
 *
 * @param map
 * @param maps
 * @param bounds
 */
export function bindResizeListener(map, maps, bounds) {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
}

/**
 * Fit map to its bounds after the api is loaded
 *
 * @param map
 * @param maps
 * @param places
 */
export function apiIsLoaded(map, maps, places) {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
}

/**
 *
 * @param places
 * @param map
 * @param maps
 * @param config
 */
export function renderPolylines(places, map, maps, config) {
  let drawnPolyline = new maps.Polyline({
    strokeColor: config.lineColor,
    strokeOpacity: 1,
    strokeWeight: config.lineWeight,
    path: placesToPath(places) //decodedPolyline.geometry.coordinates
  });
  drawnPolyline.setMap(map);
  return drawnPolyline;
}

/**
 *
 * @param places
 * @return {{lng: *, lat: *}[]}
 */
export function placesToPath(places) {
  return position.toArray(places).map(function(location) {
    return {
      lat: location[1],
      lng: location[0]
    };
  });
}
