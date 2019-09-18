const key = '6f2aa31213f556b4d1b03a048629724f';


const form = document.getElementById('inputForm');
form.onsubmit = weatherFetch;
// function to search for position

function weatherRender(json){
    var source   = document.getElementById("weatherTemplate").innerHTML;
    var template = Handlebars.compile(source);
    json['main']['temp'] -= 273.15;
    if(json['main']['temp'] < 10){
        json['main']['temp'] = json['main']['temp'] .toPrecision(2);
    }else{
        json['main']['temp'] = json['main']['temp'] .toPrecision(3);
    }

    var context = {
        cityName: json['name'],
        weatherType: json['weather'][0]['main'],
        windSpeed: json['wind']['speed'],
        humidity: json['main']['humidity'],
        currTemp: json['main']['temp']};
    document.getElementById('compiled').innerHTML = template(context);
}

function errorRender(errorText){
    var source   = document.getElementById("errorTemplate").innerHTML;
    var template = Handlebars.compile(source);

    document.getElementById('compiled').innerHTML = template(context);
}
function weatherFetch(cityName){
    var cityName = document.getElementById("cityName").value;
    var url =  'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key;
    fetch(url).then(function(response) {
        if(response.ok) {
            response.json().then(function(json) {
                weatherRender(json);
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
            if(response.status === 404){
                errorRender("City Not Found");
            }else{
                errorRender("Error Occurs");
            }

        }
    });
}
// onclick swap on dom
// button on submit type
// function refactoring