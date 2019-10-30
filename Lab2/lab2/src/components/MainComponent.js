import React, {Component} from 'react';
import {fahrenheitTransform} from '../utils';
import '../mainStyles.css';
import WeatherDataInfo from "./WeatherDataInfo";
import Loader from "./Loader";
const key = '6f2aa31213f556b4d1b03a048629724f';
export default class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.writeWeatherData = this.writeWeatherData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkFetchedData = this.checkFetchedData.bind(this);
        this.state = {
            loaded: false,
            loadingError: false,
            cityName: '',
            temperature: 0,
            pressure: 0,
            humidity: 0,
            description: '',
            icon: '0d',
            wind: 0,
            longitude: 0,
            latitude: 0,
        };
    }

    fetchWeather() {
        this.setState({
            loaded: false,
            loadingError: false,
        });
        console.log("kek");
        let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.props.pos.latitude + '&lon=' + this.props.pos.longitude + '&appid=' + key;
        fetch(url)
            .then(response => response.json()).then(this.checkFetchedData);
    }

    componentDidMount() {
        if (this.props.pos !== "") {
            this.fetchWeather();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.fetchWeather();
        }
    }

    checkFetchedData(response) {
        console.log( response);
        if (response !== undefined) {
            this.writeWeatherData(response);
        } else {
            this.setState({loadingError: true});
        }
    }
    writeWeatherData(json) {
        this.setState({
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
    render() {
        return (
            this.state.loadingError === true ?
                <div className="alert">
                    Error
                </div> :
                this.state.loaded === false ?
                    <Loader/>
                    :
                    <main className='main'>
                        <div className='main-widget'>
                            <h2 className='main__title'>{this.state.cityName}</h2>
                            <div className='main__temp-container'>
                                <img className='weather-icon' src={'http://openweathermap.org/img/w/' + this.state.weatherIcon + ".png"}
                                     alt="weather image"/>
                                <h1  className='temperature'>{fahrenheitTransform(this.state.temperature)}°C</h1>
                            </div>
                        </div>
                        <WeatherDataInfo wind = {this.state.wind} description = {this.state.description} pressure = {this.state.pressure} humidity = {this.state.humidity}
                                         longitude = {this.state.longitude.toPrecision(3)} latitude = {this.state.latitude.toPrecision(3)}/>

                    </main>
        )
    }

}