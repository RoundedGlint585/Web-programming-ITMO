const key = '6f2aa31213f556b4d1b03a048629724f';

// function to search for position
function weatherFetch(cityName){
    var cityName = document.getElementById("cityName").value;
    var url =  'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key;
    fetch(url).then(function(response) {
        if(response.ok) {
            response.json().then(function(json) {
                var source   = document.getElementById("weatherTemplate").innerHTML;
                var template = Handlebars.compile(source);
                var temperature = json['main']['temp'] - 273.15;
                if(temperature < 10){
                    temperature = temperature.toPrecision(2);
                }else{
                    temperature = temperature.toPrecision(3);
                }

                var context = {cityName: json['name'], weatherType: json['weather'][0]['main'], windSpeed: json['wind']['speed'], humidity: json['main']['humidity'], currTemp: temperature};
                document.getElementById('compiled').innerHTML = template(context);
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
            var source   = document.getElementById("errorTemplate").innerHTML;
            var template = Handlebars.compile(source);
            if(response.status == 404){
                var context = {errorText: "City Not Found"};
            }else{
                var context = {errorText: "Error occurs"};
            }

            document.getElementById('compiled').innerHTML = template(context);
            //alert("City not found, try another one");
        }
    });
}







alert(kek);