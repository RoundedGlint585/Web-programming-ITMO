import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as favouriteCityAction from '../actions/favouriteCityAction';
import FavouriteCityComponent from "./FavouriteCityComponent";
import '../favouriteCityStyles.css';
import {fetchFavouritesCities, fetchWeatherDataByName} from "../utils";
import {loadCities} from "../actions/favouriteCityAction";

class FavouriteCitiesComponent extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount(this);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        console.log("Cities mounted");
        fetchFavouritesCities(this.props.loadCities);
        //this.props.loadCities();
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
                <li key={data.name}>
                    <FavouriteCityComponent name={data.name} index={index}/>
                </li>
                <div className='favourite-city-button-container'>
                    <button onClick={(e) => this.deleteFavouriteCity(e, data.name)} className="favourite-city-button-container__button">
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
        deleteCity: city => dispatch(favouriteCityAction.deleteCity(city)),
        loadCities: cities => dispatch(favouriteCityAction.loadCities(cities)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCitiesComponent);