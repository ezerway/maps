import React, { useEffect, useState } from 'react';
import Abstract from './abstract';
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

function Leaflet({ config, places, selected }) {
  const [mapRef, setMapRef] = useState(false);
  const [groupRef, setGroupRef] = useState(false);
  const [mkIcon] = useState(
    icon({
      iconUrl: config.markerIcon,
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
  );
  const [centerPosition] = useState(getCenterPosition(places));
  const [geoJsonStyle] = useState({
    color: config.lineColor,
    weight: config.lineWeight
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

            coordinates: Position.toArray(selected.length ? selected : places)
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
      zoom={config.defaultZoom}
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

Leaflet.propTypes = Abstract.propTypes;
Leaflet.defaultProps = Abstract.defaultProps;

export default Leaflet;
