const request = require('request');

const forecast = (latitude, longitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=b3913b3252c230f08ced666943a075e9&query=" + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('unable to connect to weather service', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            // const temp = response.body.current.temperature
            // const rain = response.body.current.precip
            // const summary = response.body.current.weather_descriptions
            const { temperature, precip, weather_descriptions  } = body.current
            callback(undefined, weather_descriptions + " It is currently " + temperature + " degree outside and there is " + precip + " % chances of rain")
        }
    })
}

module.exports = forecast