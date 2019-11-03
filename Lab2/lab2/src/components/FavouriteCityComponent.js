import React, {Component} from 'react';
import '../favouriteCityStyles.css';
import WeatherDataInfo from "./WeatherDataInfo";
import Loader from "./Loader";
import {fetchWeatherDataByName} from "../utils";


export default class FavouriteCityComponent extends Component {

    constructor(props) {
        super(props);
        this.writeWeatherData = this.writeWeatherData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.writeFetchedData = this.writeFetchedData.bind(this);
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
        console.log("Logname:", this.props.name);
        fetchWeatherDataByName(this.props.name, this.writeFetchedData);
    }

    componentDidMount() {
        this.fetchWeather();
    }


    writeFetchedData(response) {
        console.log("loles", response);
        if (response.cod != 404) {
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

    fahrenheitTransform(degrees) {
        degrees -= 273.15;
        if (degrees < 10) {
            degrees = degrees.toPrecision(1);
        } else {
            degrees = degrees.toPrecision(3);
        }
        return degrees;
    }

    render() {
        return (
            this.state.loadingError === true ?
                <div>
                    <p>Error</p>
                </div> :
                this.state.loaded === false ?
                    <Loader/>
                    :
                    <div className='favourite-city-widget'>
                        <div className='favourite-city-widget__main-info'>
                            <h2> {this.state.cityName}</h2>
                            <h2>{this.fahrenheitTransform(this.state.temperature)}</h2>
                            <img src={'http://openweathermap.org/img/w/' + this.state.weatherIcon + ".png"}
                                 alt="weather image"/>

                        </div>
                        <WeatherDataInfo wind = {this.state.wind} description = {this.state.description} pressure = {this.state.pressure} humidity = {this.state.humidity}
                                         longitude = {this.state.longitude.toPrecision(3)} latitude = {this.state.latitude.toPrecision(3)}/>

                    </div>
        )
    }
}