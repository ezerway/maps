import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { toArray } from '../utils/position';
import { getCenterPosition } from '../utils/google-map';
import MarkerIcon from '../styles/images/marker.svg';

const AnyReactComponent = ({ text, children }) => <div>{children}</div>;

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    bounds.extend(new maps.LatLng(place.latitude, place.longitude));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

function GoogleMap({ markerIcon, config, defaultZoom, lineColor, places }) {
  const [centerPosition] = useState(getCenterPosition(places));
  const renderPolylines = (map, maps) => {
    let path = [];

    toArray(places).forEach(function(location) {
      let pathLatLong = {
        lat: location[1],
        lng: location[0]
      };
      path.push(pathLatLong);
    });

    let drawnPolyline = new maps.Polyline({
      strokeColor: lineColor,
      strokeOpacity: 1,
      strokeWeight: 5,
      path: path //decodedPolyline.geometry.coordinates
    });
    drawnPolyline.setMap(map);
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.api_key }}
        defaultCenter={centerPosition}
        defaultZoom={defaultZoom}
        onGoogleApiLoaded={({ map, maps }) => {
          apiIsLoaded(map, maps, places);
          renderPolylines(map, maps);
        }}
      >
        {places.map((place, key) => (
          <AnyReactComponent
            key={key}
            lat={place.latitude}
            lng={place.longitude}
          >
            <div>
              <img alt="marker" src={markerIcon} style={{ width: '4vh' }} />
              {place.title}
            </div>
          </AnyReactComponent>
        ))}
      </GoogleMapReact>
    </div>
  );
}

GoogleMap.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.oneOfType([PropTypes.object]),
  markerIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultZoom: PropTypes.number,
  lineColor: PropTypes.string
};

GoogleMap.defaultProps = {
  places: [],
  markerIcon: MarkerIcon,
  config: {
    // api_key: 'AIzaSyABi2Ci0aHYQSWeEQmP8J9asSyEpqNNmig'
  }
};

export default GoogleMap;
