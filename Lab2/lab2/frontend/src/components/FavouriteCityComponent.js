import React, {Component} from 'react';
import '../favouriteCityStyles.css';
import WeatherDataInfo from "./WeatherDataInfo";
import Loader from "./Loader";
import {addFavouriteCityToDB, fetchWeatherDataByName} from "../utils";
import WeatherImageComponent from "./WeatherImageComponent";
import * as favouriteCityAction from "../actions/favouriteCityAction";
import {connect} from "react-redux";


class FavouriteCityComponent extends Component {

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
        console.log("Express test");
        return fetchWeatherDataByName(this.props.name, this.writeFetchedData);
    }

    componentDidMount() {
        return this.fetchWeather();
    }


    writeFetchedData(response) {
        console.log("Response from express:", response);

        if (response.cod == 200) {
            this.writeWeatherData(response);
        } else {
            this.props.deleteCity(this.props.index);
            //this.setState({loadingError: true});
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
                            <WeatherImageComponent image={this.state.weatherIcon} />

                        </div>
                        <WeatherDataInfo wind = {this.state.wind} description = {this.state.description} pressure = {this.state.pressure} humidity = {this.state.humidity}
                                         longitude = {this.state.longitude.toPrecision(3)} latitude = {this.state.latitude.toPrecision(3)}/>

                    </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {
        cities: state.cities
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCity: city => dispatch(favouriteCityAction.deleteCity(city))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCityComponent);