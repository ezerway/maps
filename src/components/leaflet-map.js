import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { icon } from 'leaflet';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  FeatureGroup,
  GeoJSON
} from 'react-leaflet';
import * as Position from '../utils/position';
import { getCenterPosition, toArray } from '../utils/leaflet-map';
import 'leaflet/dist/leaflet.css';
import MarkerIcon from '../styles/images/marker.svg';

function Leaflet({ markerIcon, defaultZoom, lineColor, places }) {
  const [mapRef, setMapRef] = useState(false);
  const [groupRef, setGroupRef] = useState(false);
  const [mkIcon] = useState(
    icon({
      iconUrl: markerIcon,
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
  );
  const [centerPosition] = useState(getCenterPosition(places));
  const [geoJsonStyle] = useState({
    color: lineColor,
    weight: 5
  });
  const [geoJson] = useState([
    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',

            coordinates: Position.toArray(places)
          }
        }
      ]
    }
  ]);

  useEffect(() => {
    if (!mapRef || !groupRef) {
      return () => {};
    }

    const map = mapRef.leafletElement; //get native Map instance
    const group = groupRef.leafletElement; //get native featureGroup instance
    map.fitBounds(group.getBounds());
    return () => {};
  }, [mapRef, groupRef]);

  return (
    <Map
      center={centerPosition}
      zoom={defaultZoom}
      ref={ref => ref && setMapRef(ref)}
      style={{ width: '100%', height: '100vh' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup ref={ref => ref && setGroupRef(ref)}>
        {toArray(places).map((position, key) => (
          <Marker key={key} position={position} icon={mkIcon}>
            <Popup>
              {places[key].title}
            </Popup>
          </Marker>
        ))}
        <GeoJSON data={geoJson} style={geoJsonStyle} />
      </FeatureGroup>
    </Map>
  );
}

Leaflet.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.oneOfType([PropTypes.object]),
  markerIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultZoom: PropTypes.number,
  lineColor: PropTypes.string
};

Leaflet.defaultProps = {
  places: [],
  markerIcon: MarkerIcon,
  config: {}
};

export default Leaflet;
