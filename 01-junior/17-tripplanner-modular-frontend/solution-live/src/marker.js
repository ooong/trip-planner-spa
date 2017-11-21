const mapboxgl = require('mapbox-gl');

const imgUrls = {
	activities: "http://i.imgur.com/WbMOfMl.png",
hotels: "http://i.imgur.com/D9574Cu.png",
restaurants: "http://i.imgur.com/cqR6pUI.png"
}

const buildMarker = function (type, latln) {
	const icon = imgUrls[type] || imgUrls.activities;
	const markerDomEl = document.createElement('div');
	markerDomEl.style.width = "32px";
	markerDomEl.style.height = "39px";
	markerDomEl.style.backgroundImage = `url(${icon})`
	const marker = new mapboxgl.Marker(markerDomEl).setLngLat(latln)
	return marker;
}

module.exports = buildMarker;
