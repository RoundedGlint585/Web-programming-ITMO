import React, {Component} from 'react';
import '../favouriteCityStyles.css';
const key = '6f2aa31213f556b4d1b03a048629724f';
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
        };
    }


    fetchWeather() {
        this.setState({
            loaded: false,
            loadingError: false,
        });
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.props.name + '&appid=' + key;
        fetch(url)
            .then(response => response.json()).then(this.writeFetchedData);
    }

    componentDidMount() {
        this.fetchWeather();
    }


    writeFetchedData(response) {
        console.log(response);
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
        });
    }
    fahrenheitTransform(degrees){
        degrees -= 273.15;
        if(degrees < 10){
            degrees = degrees.toPrecision(2);
        }else{
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
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                    :
                    <div className='favourite-city-widget'>
                        <div className= 'favourite-city-widget__main-info'>
                            <h2> {this.state.cityName}</h2>
                            <h2>{this.fahrenheitTransform(this.state.temperature)}</h2>
                            <img src={'http://openweathermap.org/img/w/' + this.state.weatherIcon + ".png"}
                                 alt="weather image"/>
                        </div>
                        <ul className='add-info-list'>
                            <li className='add-info-list__item'>
                                <p>Wind</p>
                                <p>{this.state.wind}</p>
                            </li>
                            <li className='add-info-list__item'>
                                <p>Description</p>
                                <p>{this.state.description}</p>
                            </li>
                            <li className='add-info-list__item' >
                                <p>Pressure</p>
                                <p>{this.state.pressure}</p>
                            </li>
                            <li className='add-info-list__item'>
                                <p>Humidity</p>
                                <p>{this.state.humidity}</p>
                            </li>
                        </ul>

                    </div>
        )
    }
}