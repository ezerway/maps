import React from 'react';
import PropTypes from 'prop-types';
import Abstract from './components/abstract';
import GoogleMap from './components/google-map';
import LeafletMap from './components/leaflet-map';
import Mapbox from './components/mapbox';

/**
 *
 * @param isEnableGoogleMap
 * @param isEnableLeaflet
 * @param isEnableMapbox
 * @param config
 * @param places
 * @param selected
 * @return {*}
 * @constructor
 */
function Maps({
  isEnableGoogleMap,
  isEnableLeaflet,
  isEnableMapbox,
  config,
  places,
  selected
}) {

  const mapConfig = {...Abstract.defaultProps.config, ...config};

  if (isEnableGoogleMap) {
    return (
      <GoogleMap
        places={places}
        selected={selected}
        config={mapConfig}
      />
    );
  }
  if (isEnableLeaflet) {
    return (
      <LeafletMap
        places={places}
        selected={selected}
        config={mapConfig}
      />
    );
  }
  if (isEnableMapbox) {
    return (
      <Mapbox
        places={places}
        selected={selected}
        config={mapConfig}
      />
    );
  }
  return <p>Maps</p>;
}

Maps.propTypes = {
  isEnableGoogleMap: PropTypes.bool,
  isEnableLeaflet: PropTypes.bool,
  isEnableMapbox: PropTypes.bool,
  ...Abstract.propTypes
};

Maps.defaultProps = {
  ...Abstract.defaultProps,
  isEnableGoogleMap: false,
  isEnableLeaflet: false,
  isEnableMapbox: false,
};

export default Maps;
