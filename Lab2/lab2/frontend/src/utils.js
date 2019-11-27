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

    let url = '/weather?city=' + name;
    return fetch(url)
        .then(response => response.json()).then(handler);
}

export function fetchWeatherDataByPos(longitude, latitude, handler){

    let url = '/weather/coordinates?lat=' + latitude + '&long=' + longitude;
    return fetch(url)
        .then(response => response.json()).then(handler);
}

export function deleteCityFromDB(name){
    let url = '/favourites?city=' + name;
    return fetch(url, {
        method: 'delete'
    })
        .then(response => response.json());
}

export function addFavouriteCityToDB(name){
    let url = '/favourites?city=' + name;
    return fetch(url, {
        method: 'post'
    })
        .then(response => response.json());
}

export  function fetchFavouritesCities(handler){
    let url = '/favourites';
    return fetch(url).then(response => response.json()).then( (data)=>{
        handler(data);
    })
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