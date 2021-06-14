'use strict'
require('dotenv').config();
const express = require('express');
const weather = require('./data/weather.json');
const cors = require('cors');

const servers = express();
servers.use(cors());

const PORT = 3020;
// http://localhost:3020/
servers.get('/', (req, res) => {
    res.send('home route')
})

// http://localhost:3020/dataOfWeather?dataOfcity=city
servers.get('/dataOfWeather', (req, res) => {
    // let city=req.query.dataOfcity
    let city = req.query.dataOfcity

    if (weather.city_name.toLocaleLowerCase() === city.toLocaleLowerCase()) {

        let result = weather.data.map(item => {

            return {
                description: `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`,
                date: `${item.valid_date}`
            }

        })

        res.send(result)
    } else {
        res.send('please search about sydney to show the result of weather')
    }

})

servers.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
