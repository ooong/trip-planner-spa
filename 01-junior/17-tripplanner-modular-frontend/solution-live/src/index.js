const mapboxgl = require("mapbox-gl"); const { Map } = mapboxgl;
// EQUIVALENT TO ABOVE const Map = mapboxgl.Map;

const buildMarker = require('./marker')

require('../secrets')


mapboxgl.accessToken = process.env.mapToken;

const map = new Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);