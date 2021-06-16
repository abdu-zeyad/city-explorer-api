'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

//localhost:3001/weather?searchQuery=amman
app.get('/weather', handleWeather);
app.use('*', (request, response) => response.status(404).send('page not found'));

function handleWeather(request, response) {
    let searchQuery = request.query.searchQuery;
    const city = weather.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    if (city != undefined) {
        const weatherArray = city.data.map(day => new Weather(day));
        response.status(200).send(weatherArray);
    }
    else {
        errorHandler(response);
    }
}

function errorHandler(response) {
    response.status(500).send('something went wrong');
}


class Weather {
    constructor(dataForWeather) {
        this.descriptionWeather = dataForWeather.weather.description;
        this.dateWeather = dataForWeather.valid_date;
    }
}


app.listen(PORT, () => console.log(`listening on ${PORT}`))