const request = require("request");
// const geocode = require("./geocode");

const forecast = (latitude, longitude, location, callback) => {
  var options = {
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    qs: {
      lat: latitude,
      lon: longitude,
      id: "2172797",
      lang: "null",
      units: "%22metric%22 or %22imperial%22",
      mode: "xml%2C html",
      q: location,
    },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "3d7d1fcc5amsh5a82c2ff6ed8ff5p174385jsnc3bd6940e205",
      useQueryString: true,
    },
    json: true,
  };

  request(options, (error, response) => {
    if (error) {
      callback("Access Denied! Check Network", undefined);
    } else if (response.body.error) {
      callback("Unable to access location", undefined);
    } else {
      const itemDesc = response.body.weather[0].description;

      callback(
        undefined,
        `The weather is currently ${itemDesc} at ${response.body.name} which is located in ${response.body.sys.country}`
      );
    }
  });
};

module.exports = forecast;
