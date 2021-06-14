const express = require('express');
const server = express(); //I can use the express methods using server variable
const WeatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors()); //make my server opened for everyone

const PORT = 3020;


//localhost:3010/
server.get('/', (req, res) => {
    res.send('Welcome From Abdelmajed');
})

//localhost:3010/getPokeNames
server.get('/getdates', (req, res) => {
    let dates = WeatherData.data.map(item => {
        return item.valid_date;

    })
    res.send(dates);
})

//http://localhost:3020/getDatepra?dates=2021-04-07
server.get('/getDatepra', (req, res) => {
    let getDatepra = req.query.dates;
    let dateItem = WeatherData.data.find(item => {
        if (item.valid_date == getDatepra)
            return item;
    })
    res.send(dateItem);

})


//localhost:3010 .....
server.get('*', (req, res) => {
    res.status(404).send('sorry, this page not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})