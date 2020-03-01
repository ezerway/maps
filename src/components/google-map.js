import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Abstract from './abstract';
import {
  getCenterPosition,
  apiIsLoaded,
  renderPolylines,
  placesToPath
} from '../utils/google-map';

const AnyReactComponent = ({ text, children }) => <div>{children}</div>;

function GoogleMap({ config, places, selected }) {
  const [centerPosition] = useState(getCenterPosition(places));
  const [map, setMap] = useState(false);
  const [maps, setMaps] = useState(false);
  const [drawnPolyline, setDrawnPolyline] = useState(false);

  useEffect(() => {
    if (!map || !maps || !drawnPolyline) {
      return () => {};
    }

    drawnPolyline.setPath(placesToPath(selected.length ? selected : places));

    return () => {};
  }, [selected, map, maps]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: config.api_key }}
        defaultCenter={centerPosition}
        defaultZoom={config.defaultZoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map);
          setMaps(maps);
          apiIsLoaded(map, maps, places);
          setDrawnPolyline(
            renderPolylines(
              selected.length ? selected : places,
              map,
              maps,
              config
            )
          );
        }}
      >
        {places.map((place, key) => (
          <AnyReactComponent
            key={key}
            lat={place.latitude}
            lng={place.longitude}
          >
            <div>
              <img
                alt="marker"
                src={config.markerIcon}
                style={{ width: '4vh' }}
              />
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
