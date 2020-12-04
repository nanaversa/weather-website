const request = require("request");

const geocode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibmFuYS12ZXJzYSIsImEiOiJja2d3ZnVocGgwOW9yMnRwOHN0Mnh2aDdhIn0.aFF8rG8A2aM-QzUhENxK3g";
  request({ uri: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to access location", undefined);
    } else if (response.body.features.length === 0) {
      callback("No locations found", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
