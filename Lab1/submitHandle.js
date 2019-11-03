const form = document.getElementById('inputForm');
form.onsubmit = function(){
    event.preventDefault();
    cityName = document.getElementById('cityName').value;
    weatherFetch(cityName, weatherRender, errorRender);
};