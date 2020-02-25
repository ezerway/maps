# ezerway-maps
A maps wrapper component.

Includes:
- [Google Map](https://www.google.com/maps)
- [Leaflet Map](https://leafletjs.com)
- [Mapbox](https://www.mapbox.com)

## Installation

```
npm i ezerway-maps -S
// or
yarn add ezerway-maps --save
```

## Usage

```
...
import Maps from 'ezerway-maps';

const places = [
    [
        {longitude: -71.254028, latitude: 46.829853, title: 'Quebec City'},
        {longitude: -70.15268, latitude: 47.654, title: 'La Malbaie'},
    ]
];

const config = {
    api_key: '', // google api key
    viewport: { // default viewport for leaflet map
        latitude: 0,
        longitude: 0
    },
    accessToken: '' mapbox access token
};

...
render() {
    return (
        <Maps isEnableGoogleMap={true} places={places} config={config} />
    )
}

```

## Good luck :)