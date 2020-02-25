import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './components/google-map';
import LeafletMap from './components/leaflet-map';
import Mapbox from './components/mapbox';
import MarkerIcon from './styles/images/marker.svg';

/**
 *
 * @param isEnableGoogleMap
 * @param isEnableLeaflet
 * @param isEnableMapbox
 * @param config
 * @param markerIcon
 * @param defaultZoom
 * @param lineColor
 * @param places
 * @return {*}
 * @constructor
 */
function Maps({
  isEnableGoogleMap,
  isEnableLeaflet,
  isEnableMapbox,
  config,
  markerIcon,
  defaultZoom,
  lineColor,
  places
}) {
  if (isEnableGoogleMap) {
    return (
      <GoogleMap
        places={places}
        markerIcon={markerIcon}
        defaultZoom={defaultZoom}
        lineColor={lineColor}
        config={config}
      />
    );
  }
  if (isEnableLeaflet) {
    return (
      <LeafletMap
        places={places}
        markerIcon={markerIcon}
        defaultZoom={defaultZoom}
        lineColor={lineColor}
        config={config}
      />
    );
  }
  if (isEnableMapbox) {
    return (
      <Mapbox
        places={places}
        markerIcon={markerIcon}
        defaultZoom={defaultZoom}
        lineColor={lineColor}
        config={config}
      />
    );
  }
  return <p>Maps</p>;
}

Maps.propTypes = {
  isEnableGoogleMap: PropTypes.bool,
  isEnableLeaflet: PropTypes.bool,
  isEnableMapbox: PropTypes.bool,
  config: PropTypes.oneOfType([PropTypes.object]),
  markerIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultZoom: PropTypes.number,
  lineColor: PropTypes.string,
  places: PropTypes.arrayOf(PropTypes.object)
};

Maps.defaultProps = {
  isEnableGoogleMap: false,
  isEnableLeaflet: false,
  isEnableMapbox: false,
  markerIcon: MarkerIcon,
  defaultZoom: 8,
  lineColor: '#BF93E4',
  places: []
};

export default Maps;
