const form = document.getElementById('inputForm').addEventListener('submit', function(e){
    e.preventDefault();
    const cityName = e.target[0].value;
    weatherFetch(cityName, weatherRender, errorRender);
});
