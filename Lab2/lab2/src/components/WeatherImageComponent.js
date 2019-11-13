import React, {Component} from 'react';

export default function WeatherImageComponent(props) {
    const api = 'http://openweathermap.org/img/w/';
    console.log("keklol");
    return (<img className='weather-icon'
                 src={api + props.image + ".png"}
                 alt="weather image"/>)
}