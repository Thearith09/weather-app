const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=15e1bb266397b3d1edfa896e7bfce03d&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. 
                                It is ${body.current.temperature} degree celsius out there. 
                                There is ${body.current.precip}% chance of rain.`);
        }
    });
};

module.exports = forecast;