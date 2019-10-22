import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as favouriteCityAction from '../actions/favouriteCityAction';
import FavouriteCityComponent from "./FavouriteCityComponent";
import '../favouriteCityStyles.css';
const key = '6f2aa31213f556b4d1b03a048629724f';

class FavouriteCitiesComponent extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateAndAddCityName = this.validateAndAddCityName.bind(this);
        this.state = {
            name: ''
        }
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    validateAndAddCityName(response) {
        if (response.ok) {
            let city = {
                name: this.state.name
            };
            this.setState({
                name: ''
            });
            this.props.addFavouriteCity(city);
        } else {
            alert("City not found");
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.name + '&appid=' + key;
        fetch(url).then(this.validateAndAddCityName);
    }

    listView(data, index) {
        return (
            <div className='favourite-city-container'>
                <li key={index}>
                    <FavouriteCityComponent name={data.name}/>
                </li>
                <div>
                    <button onClick={(e) => this.deleteFavouriteCity(e, index)}>
                        Remove
                    </button>
                </div>
            </div>
        )
    }

    deleteFavouriteCity(e, index) {
        e.preventDefault();
        this.props.deleteFavouriteCity(index);
    }

    render() {

        return (
            <div className='favourite-cities'>
                <div className='favourite-cities-header' >
                    <h3 >Favourite</h3>
                    <form onSubmit={this.handleSubmit} >
                        <input type="text" onChange={this.handleChange}
                               value={this.state.name}/>
                        <input type="submit"  value="ADD"/>
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
    return {
        cities: state.cities
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFavouriteCity: city => dispatch(favouriteCityAction.addFavouriteCity(city)),
        deleteFavouriteCity: index => dispatch(favouriteCityAction.deleteFavouriteCity(index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCitiesComponent);