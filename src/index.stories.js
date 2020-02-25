import React from 'react';
import Maps from './index';

export default { title: 'Maps' };


const places = [
    {
        longitude: -77.0366048812866,
        latitude: 38.89873175227713,
        title: 0
    },
    {
        longitude: -77.03364372253417,
        latitude: 38.89876515143842,
        title: 1
    },
    {
        longitude: -77.03364372253417,
        latitude: 38.89549195896866,
        title: 2
    },
    {
        longitude: -77.02982425689697,
        latitude: 38.89549195896866,
        title: 3
    },
    {
        longitude: -77.02400922775269,
        latitude: 38.89387200688839,
        title: 4
    },
    {
        longitude: -77.01519012451172,
        latitude: 38.891416957534204,
        title: 5
    },
    {
        longitude: -77.01521158218382,
        latitude: 38.892068305429156,
        title: 6
    },
    {
        longitude: -77.00813055038452,
        latitude: 38.892051604275686,
        title: 7
    },
    {
        longitude: -77.00832366943358,
        latitude: 38.89143365883688,
        title: 8
    },
    {
        longitude: -77.00818419456482,
        latitude: 38.89082405874451,
        title: 9
    },
    {
        longitude: -77.00815200805664,
        latitude: 38.88989712255097,
        title: 10
    }
    // [
    //     {longitude: -71.254028, latitude: 46.829853, title: 'Quebec City'},
    //     {longitude: -70.15268, latitude: 47.654, title: 'La Malbaie'},
    // ]
];

const config = {
    api_key: 'AIzaSyABi2Ci0aHYQSWeEQmP8J9asSyEpqNNmig',
    viewport: {
        latitude: 0,
        longitude: 0
    },
    accessToken: 'pk.eyJ1IjoiaHVuZzE5OTZoeSIsImEiOiJjazcxa2djbngwNnNqM21ubXV1bDhyaXM1In0.G8lSCFr-AIHLyakEjSy9Mg'
};

export const GoogleMap = () => <Maps isEnableGoogleMap={true} places={places} config={config} />;
export const Mapbox = () => <Maps isEnableMapbox={true} places={places} config={config} />;
export const Leaflet = () => <Maps isEnableLeaflet={true} places={places} config={config} />;
