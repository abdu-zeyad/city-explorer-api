const axios = require("axios");
module.exports = weatherHandler;

let myMemory = {};

function weatherHandler(req, res) {
  let getWeather = req.query.city;
  let key = process.env.WEATHER_KEY;

  if (myMemory[getWeather] !== undefined) {
    console.log("get the data from Memory");
    //get the data from the memory
    response.send(myMemory[getWeather]);
  } else {
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${getWeather}&key=${key}`;

    axios
      .get(weatherUrl)
      .then((result) => {
        const weatherArr = result.data.data.map((item) => {
          return new Forecast(item);
        });
        myMemory[getWeather] = weatherArr;

        res.send(weatherArr);
      })
      .catch((err) => {
        res.status(500).send(`Not found ${err}`);
      });
  }
}
class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
  }
}
