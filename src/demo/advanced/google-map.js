import Maps from '../../index';
import React, { useState } from 'react';

export const GoogleMap = ({ places, config }) => {
  const [selected, setSelected] = useState(places);

  const onChange = ({ target }) => {
    setSelected(
      [].map.call(target.selectedOptions, opt => {
        return places[opt.value];
      })
    );
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
    >
      <div style={{ width: '70%' }}>
        <Maps
          isEnableGoogleMap={true}
          places={places}
          config={config}
          selected={selected}
        />
      </div>
      <div style={{ width: '30%' }}>
        <select
          multiple={true}
          style={{ width: '100%', height: '100%' }}
          onChange={onChange}
        >
          {places.map((place, index) => {
            return (
              <option key={index} value={index}>
                Place: {place.title} lat: {place.latitude} lng:{' '}
                {place.longitude}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default GoogleMap;
