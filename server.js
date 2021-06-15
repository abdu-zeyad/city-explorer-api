'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();

const PORT = process.env.PORT;

server.use(cors()); //my server can get any req from any clinet

//localhost:3001/
server.get('/', homeHandler)
server.get('/weather', weatherhandler)



//localhost:3001/
function homeHandler(req, res) {
    res.send('Home route');
}


function weatherhandler(req, res) {
    let lon = req.query.lon;
    let lat = req.query.lat;
    console.log(lon, lat);
    const key = process.env.KEY;
    let url = `//https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}&include=minutely`;



    axios.get(url).then(apiResult => {
        console.log('inside promise');
        const weatherArray = apiResult.data.results.map(weatherItem => {
            return new Weather(weatherItem);
        })
        res.send(weatherArray);
    })
        .catch(err => {
            res.send(`there is an error in getting the data => ${err}`);
        })

}

class Weather {
    constructor(item) {
        this.imgUrl = item.urls.raw;
        this.numLikes = item.likes;
    }
}

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})