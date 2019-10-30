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
    fetch(url)
        .then(response => response.json()).then(handler);
}

export function fetchWeatherDataByPos(longitude, latitude, handler){
    let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + key;
    fetch(url)
        .then(response => response.json()).then(handler);
}