
const assert = require('assert');
const mocha = require('mocha');
const fetchMock = require('fetch-mock');
const describe = mocha.describe;

const test = require('../weatherFetching.js');


describe("From Fahrenheit to Celsius", function() {
    it('290 in fahrenheit should be equal to 16.9', function () {
        assert.equal(test.fromFahrenheitToCelsius(290), 16.9, "Temperatures are not equal");
    });
});

describe("Fetch check", function(){
    it('Success callback', function(done){
        const mockSuccessResponse = {
            "coord": {
                "lon": -0.13,
                "lat": 51.51
            },
            "weather": [
                {
                    "id": 300,
                    "main": "Drizzle",
                    "description": "light intensity drizzle",
                    "icon": "09d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 280.32,
                "pressure": 1012,
                "humidity": 81,
                "temp_min": 279.15,
                "temp_max": 281.15
            },
            "visibility": 10000,
            "wind": {
                "speed": 4.1,
                "deg": 80
            },
            "clouds": {
                "all": 90
            },
            "dt": 1485789600,
            "sys": {
                "type": 1,
                "id": 5091,
                "message": 0.0103,
                "country": "GB",
                "sunrise": 1485762037,
                "sunset": 1485794875
            },
            "id": 2643743,
            "name": "London",
            "cod": 200
        };
        fetchMock.mock('*', mockSuccessResponse);
        //global.fetch = mockFetchPromise;
        //global.fetch = require("node-fetch");

        try {
            test.weatherFetch('Moscow', (json) => {
                done()
            })
        }
        catch (err) {
            console.log(err);
        }
        fetchMock.reset();
   });
    it('Error callback', function(done){
        fetchMock.mock('*', 404);
        //global.fetch = require("node-fetch");
        try{
            test.weatherFetch('adaf', ()=>{},  (name)=>{done()})
        }
        catch (err) {
            console.log(err);
        }
        fetchMock.reset();
    })
});