import React from 'react';
const key = '6f2aa31213f556b4d1b03a048629724f';
export default class MainWidget extends React.Component{
    constructor(props, context){
        super(props, context);
        this.writeWeatherData = this.writeWeatherData.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = { loaded: false,
            cityName: '',
            temperature: 0,
            pressure: 0,
            humidity: 0,
            description: '',
            icon: '0d',
            wind: 0,
            coordinates: props.coordinates};
    }

    writeWeatherData(json){
        console.log(json)
        this.setState({loaded : true,
            cityName: json['name'],
            temperature: json['main']['temp'],
            pressure: json['main']['pressure'],
            humidity: json['main']['humidity'],
            weatherIcon: json['weather'][0]['icon'],
            description: json['weather'][0]['main'],
            wind: json['wind']['speed'],
        });
    }
    componentDidMount(){
        let url =  'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.coordinates.latitude + '&lon='+ this.state.coordinates.longitude + '&appid=' + key;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(this.writeWeatherData);
    }
    render(){
        console.log(this.state.description)
        return(
            this.state.loaded === false?
                <div className='loader'>
                    <p>Loading</p>
                </div>
                :
                <div className='mainWidget'>
                    <div className='mainWidget-weather'>
                        <div> {this.state.cityName}</div>
                        <div className='infoContainer'>
                            <img src = {'http://openweathermap.org/img/w/' + this.state.weatherIcon + ".png"} alt = "weather image"/>
                            <h1>{this.state.temperature}</h1>
                        </div>
                    </div>
                    <div className='mainWidget-additionalInfo'>
                        <ul className='info-list'>
                            <li className='info-list__item'>
                                <p className ='info-list__item__name'>Wind</p>
                                <p className ='info-list__item__value'>{this.state.wind}</p>
                            </li>
                            <li className='info-list__item'>
                                <p className ='info-list__item__name'>Description</p>
                                <p className ='info-list__item__value'>{this.state.description}</p>
                            </li>
                            <li className='info-list__item'>
                                <p className ='info-list__item__name'>Pressure</p>
                                <p className ='info-list__item__value'>{this.state.pressure}</p>
                            </li>
                            <li className='info-list__item'>
                                <p className ='info-list__item__name'>Humidity</p>
                                <p className ='info-list__item__value'>{this.state.humidity}</p>
                            </li>
                            <li className='info-list__item'>
                                <p className ='info-list__item__name'>Coordinates</p>
                                <p className ='info-list__item__value'>[{this.state.coordinates.longitude.toPrecision(3)},{this.state.coordinates.latitude.toPrecision(3)}]</p>
                            </li>
                        </ul>
                    </div>

                </div>
        )
    }
}