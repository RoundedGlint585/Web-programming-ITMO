
const assert = require('assert');
const mocha = require('mocha');
const describe = mocha.describe;

const test = require('../weatherFetching.js');


describe("From Fahrenheit to Celsius", function() {
    it('290 in fahrenheit should be equal to 16.9', function () {
        assert.equal(test.fromFahrenheitToCelsius(290), 16.9, "Temperatures are not equal");
    });
});

describe("Fetch check", function(){
    it('Success callback', function(done){
        global.fetch = require("node-fetch");
        try {
            test.weatherFetch('Moscow', (json) => {
                done()
            })
        }
        catch (err) {
            console.log(err);
        }
   });
    it('Error callback', function(done){
        global.fetch = require("node-fetch");
        try{
            test.weatherFetch('adaf', ()=>{},  (name)=>{done()})
        }
        catch (err) {
            console.log(err);
        }
    })
});