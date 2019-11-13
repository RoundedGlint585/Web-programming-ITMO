const key = '6f2aa31213f556b4d1b03a048629724f';
export function fahrenheitTransform(degrees){
    degrees -= 273.15;
    if(degrees < 10){
        degrees = degrees.toPrecision(1);
    }else{
        degrees = degrees.toPrecision(3);
    }
    return degrees;
}

export function fetchWeatherDataByName(name, handler){
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=' + key;
    return fetch(url)
        .then(response => response.json()).then(handler);
}

export function fetchWeatherDataByPos(longitude, latitude, handler){
    let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + key;
    return fetch(url)
        .then(response => response.json()).then(handler);
}

export function writeWeatherData(instance, json) {
    instance.setState({
        loaded: true,
        cityName: json['name'],
        temperature: json['main']['temp'],
        pressure: json['main']['pressure'],
        humidity: json['main']['humidity'],
        weatherIcon: json['weather'][0]['icon'],
        description: json['weather'][0]['main'],
        wind: json['wind']['speed'],
        longitude: json['coord']['lon'],
        latitude: json['coord']['lat'],
    });
}