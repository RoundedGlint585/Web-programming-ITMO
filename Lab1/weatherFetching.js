const key = '6f2aa31213f556b4d1b03a048629724f';

function inputCallback(e){
    e.preventDefault();
    const cityName = e.target[0].value;
    weatherFetch(cityName, weatherRender, errorRender);
}
// function to search for position
function fromFahrenheitToCelsius(temp){
    let result = temp -273.15;
    return result < 10 ? result.toPrecision(2) : result.toPrecision(3);
}

function weatherRender(json){
    let source   = document.getElementById('weatherTemplate').innerHTML;
    let template = Handlebars.compile(source);
    json['main']['temp'] = fromFahrenheitToCelsius(json['main']['temp']);

    let context = {
        cityName: json['name'],
        weatherType: json['weather'][0]['main'],
        windSpeed: json['wind']['speed'],
        humidity: json['main']['humidity'],
        currTemp: json['main']['temp']
    };
    document.getElementById('compiled').innerHTML = template(context);
}

function errorRender(errorText){
    let source   = document.getElementById('errorTemplate').innerHTML;
    let template = Handlebars.compile(source);
    let context ={ errorText: errorText};
    document.getElementById('compiled').innerHTML = template(context);
}
function weatherFetch(cityName, successCallback, errorCallback){
    let url =  'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key;
    fetch(url).then(function(response) {
        if(response.ok) {
            response.json().then(function(json) {
                successCallback(json);
                }
            );
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
            if(response.status === 404){
                errorCallback('City Not Found');
            }else{
                errorCallback('Error Occurs');
            }
        }
    });
}

//module.exports = {fromFahrenheitToCelsius, weatherFetch, weatherRender, errorRender};