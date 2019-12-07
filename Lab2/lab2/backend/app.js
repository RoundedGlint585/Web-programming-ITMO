
const express = require('express');
const path = require('path');
var request = require('request');
const app = express();

var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://web_lab4:12345678@localhost:5432/web_lab4");

global.fetch = require("node-fetch");


app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/weather', async (req, res)  => {
    return fetchWeatherDataByName(req.query.city, (resp)=>{res.status(200).send(resp)});
});

app.get('/weather/coordinates', async (req, res) =>{
    return fetchWeatherDataByPos(req.query.lat, req.query.long, (resp)=>{res.status(200).send(resp)});
});

app.get('/favourites', async (req, res) =>{
    console.log("Requested cities");
    db.many("SELECT * FROM cities;").then((data)=>{res.send(data);})
    //fetchWeatherDataByPos(req.query.lat, req.query.long, (resp)=>{res.send(resp)});
});

app.post('/favourites', async (req, res) => {
    fetchWeatherDataByName(req.query.city, function(response){
        console.log(response);
        if(response){
            db.none('Insert into cities(name) values($1)', req.query.city).then(result => {
                res.status(200).send(response);
            }).catch((error) => {
                res.status(304).send("Already in cities");
            });

        }
    });
});

app.delete('/favourites', function (req, res) {
    db.none('Delete from cities where name = $1', req.query.city).then(
        ()=>res.status(200).send()
    ).catch( (error) =>{
        res.status(304).send("There is no such city");
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

const key = '6f2aa31213f556b4d1b03a048629724f';

async function fetchWeatherDataByName(name, handler){
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=' + key;
    request.get(url, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        handler(body);
    });
}

async function fetchWeatherDataByPos(longitude, latitude, handler){
    console.log(longitude, latitude);
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + longitude +  '&lon=' + latitude + '&appid=' + key;
    request.post(url, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        handler(body);
    });
}
