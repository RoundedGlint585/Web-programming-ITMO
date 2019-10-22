import React, {Component} from 'react';
import '../mainStyles.css';
const key = '6f2aa31213f556b4d1b03a048629724f';
export default class MainComponent extends Component {
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
        console.log("kek");
        let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.props.pos.latitude + '&lon=' + this.props.pos.longitude + '&appid=' + key;
        fetch(url)
            .then(response => response.json()).then(this.writeFetchedData);
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

    writeFetchedData(response) {
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
                <div className="alert">
                    Error
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
                    <main className='main'>
                        <div className='main-widget'>
                            <h2 className='main__title'>{this.state.cityName}</h2>
                            <div className='main__temp-container'>
                                <img className='weather-icon' src={'http://openweathermap.org/img/w/' + this.state.weatherIcon + ".png"}
                                     alt="weather image"/>
                                <h1  className='temperature'>{this.fahrenheitTransform(this.state.temperature)}°C</h1>
                            </div>
                        </div>

                            <ul className='add-info-list' >
                                <li className='add-info-list__item' >
                                    <p >Wind</p>
                                    <p >{this.state.wind}</p>
                                </li>
                                <li className='add-info-list__item'>
                                    <p >Description</p>
                                    <p >{this.state.description}</p>
                                </li >
                                <li className='add-info-list__item'>
                                    <p >Pressure</p>
                                    <p >{this.state.pressure}</p>
                                </li>
                                <li className='add-info-list__item'>
                                    <p >Humidity</p>
                                    <p >{this.state.humidity}</p>
                                </li>
                                <li className='add-info-list__item'>
                                    <p>Coordinates</p>
                                    <p >[{this.props.pos.longitude.toPrecision(3)},{this.props.pos.latitude.toPrecision(3)}]</p>
                                </li>
                            </ul>

                    </main>
        )
    }

}