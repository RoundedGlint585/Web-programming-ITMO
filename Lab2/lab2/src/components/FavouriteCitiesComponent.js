import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as favouriteCityAction from '../actions/favouriteCityAction';
import FavouriteCityComponent from "./FavouriteCityComponent";
import '../favouriteCityStyles.css';
import {fetchWeatherDataByName} from "../utils";

class FavouriteCitiesComponent extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: ''
        }
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.validateAndAddCity(this.state.name);
    }

    listView(data, index) {
        return (
            <div className='favourite-city-container'>
                <li key={index}>
                    <FavouriteCityComponent name={data.name}/>
                </li>
                <div className='favourite-city-button-container'>
                    <button onClick={(e) => this.deleteFavouriteCity(e, index)} className="favourite-city-button-container__button">
                        Remove
                    </button>
                </div>
            </div>
        )
    }

    deleteFavouriteCity(e, index) {
        e.preventDefault();
        this.props.deleteCity(index);
    }

    render() {

        return (
            <div className='favourite-cities'>
                <div className='favourite-cities-header' >
                    <h3 >Favourite</h3>
                    <form onSubmit={this.handleSubmit}  className="favourite-cities__submit-form">
                        <input type="text" placeholder="Type city here..." onChange={this.handleChange}
                               value={this.state.name} className="submit-form__input" />
                        <button type="submit" className="submit-form__button"> Add</button>
                    </form>
                </div>

                <div>
                    {<ul className='favourite-cities-list' >
                        {this.props.cities.map((city, i) => this.listView(city, i))}
                    </ul>}
                </div>
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
        validateAndAddCity: city => dispatch(favouriteCityAction.validateAndAddCity(city)),
        deleteCity: index => dispatch(favouriteCityAction.deleteCity(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCitiesComponent);