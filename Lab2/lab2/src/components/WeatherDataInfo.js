import React, {Component} from 'react';
import fahrenheitTransform from '../utils';
import '../mainStyles.css';
const key = '6f2aa31213f556b4d1b03a048629724f';
export default class WeatherDataInfo extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <ul className='add-info-list' >
                <li className='add-info-list__item' >
                    <p >Wind</p>
                    <p >{this.props.wind}</p>
                </li>
                <li className='add-info-list__item'>
                    <p >Description</p>
                    <p >{this.props.description}</p>
                </li >
                <li className='add-info-list__item'>
                    <p >Pressure</p>
                    <p >{this.props.pressure}</p>
                </li>
                <li className='add-info-list__item'>
                    <p >Humidity</p>
                    <p >{this.props.humidity}</p>
                </li>
                <li className='add-info-list__item'>
                    <p>Coordinates</p>
                    <p >[{this.props.longitude},{this.props.latitude}]</p>
                </li>
            </ul>
        )
    }

}