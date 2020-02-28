import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Abstract from './abstract';
import { getCenterPosition, apiIsLoaded, renderPolylines } from '../utils/google-map';

const AnyReactComponent = ({ text, children }) => <div>{children}</div>;

function GoogleMap({ config, places, selected }) {
  const [centerPosition] = useState(getCenterPosition(places));
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.api_key }}
        defaultCenter={centerPosition}
        defaultZoom={config.defaultZoom}
        onGoogleApiLoaded={({ map, maps }) => {
          apiIsLoaded(map, maps, places);
          renderPolylines(selected.length ? selected : places, map, maps, config);
        }}
      >
        {places.map((place, key) => (
          <AnyReactComponent
            key={key}
            lat={place.latitude}
            lng={place.longitude}
          >
            <div>
              <img alt="marker" src={config.markerIcon} style={{ width: '4vh' }} />
              {place.title}
            </div>
          </AnyReactComponent>
        ))}
      </GoogleMapReact>
    </div>
  );
}

GoogleMap.propTypes = Abstract.propTypes;
GoogleMap.defaultProps = Abstract.defaultProps;

export default GoogleMap;
