import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import { getCenterPosition, toArray } from '../utils/position';
import { toBounds } from '../utils/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkerIcon from '../styles/images/marker.svg';

function Mapbox({ places, markerIcon, defaultZoom, lineColor, config }) {
  const [map, setMap] = useState(false);
  const [centerPosition] = useState(getCenterPosition(places));
  const [viewport, setViewport] = useState({
    ...{
      ...config.viewport,
      zoom: defaultZoom
    },
    ...centerPosition
  });

  useEffect(() => {
    if (!viewport || !viewport.width) {
      return () => {};
    }
    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewport
    ).fitBounds(toBounds(places), {
      padding: 60
    });

    if (viewport.longitude === longitude && viewport.latitude === latitude) {
      return () => {};
    }
    setViewport({
      longitude,
      latitude,
      zoom
    });
    return () => {};
  }, [viewport]);

  useEffect(() => {
    if (!map) {
      return () => {};
    }

    map.on('load', function() {
      // A GeoJSON object with a LineString route from the White House to Capitol Hill
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              properties: {},
              coordinates: toArray(places)
            }
          }
        ]
      };
      map.addSource('LineString', {
        type: 'geojson',
        data: geojson
      });
      map.addLayer({
        id: 'LineString',
        type: 'line',
        source: 'LineString',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': lineColor,
          'line-width': 5
        }
      });
    });
    return () => {};
  }, [map]);

  return (
    <ReactMapGL
      {...viewport}
      ref={ref => ref && setMap(ref.getMap())}
      width="100vw" // It always override the view(viewport) width state.
      height="100vh" // It always override the view(viewport) height state.
      mapboxApiAccessToken={config.accessToken}
      onViewportChange={setViewport}
    >
      {places.map((place, key) => (
        <Marker key={key} latitude={place.latitude} longitude={place.longitude}>
          <div>
            <img alt="marker" src={markerIcon} style={{ width: '4vh' }} />
            {place.title}
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

Mapbox.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.oneOfType([PropTypes.object]),
  markerIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  defaultZoom: PropTypes.number,
  lineColor: PropTypes.string
};

Mapbox.defaultProps = {
  places: [],
  markerIcon: MarkerIcon,
  config: {
    viewport: {
      latitude: 0,
      longitude: 0
    }
    // accessToken: 'pk.eyJ1IjoiaHVuZzE5OTZoeSIsImEiOiJjazcxa2djbngwNnNqM21ubXV1bDhyaXM1In0.G8lSCFr-AIHLyakEjSy9Mg'
  }
};

export default Mapbox;
