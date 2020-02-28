import React, { useEffect, useState } from 'react';
import Abstract from './abstract';
import ReactMapGL, { Marker, WebMercatorViewport } from 'react-map-gl';
import { getCenterPosition, toArray } from '../utils/position';
import { toBounds } from '../utils/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

function Mapbox({ places, selected, config }) {
  const [map, setMap] = useState(false);
  const [centerPosition] = useState(getCenterPosition(places));
  const [viewport, setViewport] = useState({
    ...{
      ...config.viewport,
      zoom: config.defaultZoom
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
              coordinates: toArray(selected.length ? selected : places)
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
          'line-color': config.lineColor,
          'line-width': config.lineWeight
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
            <img alt="marker" src={config.markerIcon} style={{ width: '4vh' }} />
            {place.title}
          </div>
        </Marker>
      ))}
    </ReactMapGL>
  );
}

Mapbox.propTypes = Abstract.propTypes;
Mapbox.defaultProps = Abstract.defaultProps;

export default Mapbox;
