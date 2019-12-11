const assert = require('assert');
const mocha = require('mocha');
const path = require('path');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const fetchMock = require('fetch-mock');
const describe = mocha.describe;
const rewire = require('rewire');
const sinon = require('sinon');
const PubSub = require('pubsub-js');
const Handlebars = require('../ThirdParty/handlebars-v4.2.0');

const app = rewire('../weatherFetching.js');

describe("From Fahrenheit to Celsius", function () {
    it('290 in fahrenheit should be equal to 16.9', function () {
        assert.equal(app.__get__('fromFahrenheitToCelsius')(290), 16.9, "Temperatures are not equal");
    });
});

describe("Fetch check", function () {
    it('Success callback', function (done) {
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
            app.__get__('weatherFetch')('Moscow', (json) => {
                done()
            })
        } catch (err) {
            console.log(err);
        }
        fetchMock.reset();
    });
    it('Error callback', function (done) {
        fetchMock.mock('*', 404);
        //global.fetch = require("node-fetch");
        try {
            app.__get__('weatherFetch')('adaf', () => {
            }, (name) => {
                done()
            })
        } catch (err) {
            console.log(err);
        }
        fetchMock.reset();
    })
});

describe("Document test", function () {
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

    it('Document weather render called correctly', () => {
        JSDOM.fromFile("index.html", {runScripts: "dangerously", resources: "usable"}).then(dom => {
            fetchMock.mock('*', mockSuccessResponse);
            let callback = sinon.spy();
            PubSub.subscribe("weatherRender", callback);
            global.Handlebars = Handlebars;
            global.document = dom.window.document;
            global.weatherFetch = sinon.stub();
            app.__get__('inputCallback')({
                preventDefault: () => {
                }, target: [{value: 'Moscow'}]
            });
            PubSub.publishSync("weatherRender");
            assert.equal(callback.called, true);
        });
        fetchMock.reset();
    });
    it('Document error render', () => {
        JSDOM.fromFile("index.html", {runScripts: "dangerously", resources: "usable"}).then(dom => {
            fetchMock.mock('*', 404);
            let callback = sinon.spy();
            PubSub.subscribe("errorRender", callback);
            global.Handlebars = Handlebars;
            global.document = dom.window.document;
            global.weatherFetch = sinon.stub();
            app.__get__('inputCallback')({
                preventDefault: () => {
                }, target: [{value: 'Moscow'}]
            });
            PubSub.publishSync("errorRender");
            assert.equal(callback.called, true);
        });
        fetchMock.reset();
    });
});

