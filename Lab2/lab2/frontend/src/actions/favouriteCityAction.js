import * as actionTypes from './actionTypes';
import {deleteCityFromDB, fetchFavouritesCities, fetchWeatherDataByName} from "../utils";

export const addFavouriteCity = (city) => {
    return {
        type: actionTypes.ADD_NEW_FAVOURITE_CITY,
        city: city
    }
};

export const deleteFavouriteCity = (city) => {
    return {
        type: actionTypes.DELETE_FAVOURITE_CITY,
        city: city
    }
};
export const setFavouriteCities = (cities) =>{
    return {
        type: actionTypes.SET_FAVOURITE_CITIES,
        cities: cities
    }
};


export function validateAndAddCity(city) {
    return (dispatch) => {
        dispatch(addFavouriteCity(city));
    };
}

export function deleteCity(city){
    deleteCityFromDB(city);
    return (dispatch) => {
        dispatch(deleteFavouriteCity(city))
    };
}
export function loadCities(cities){
    console.log("Cities to set", cities);
    return (dispatch) => {
        console.log("Test");
        dispatch(setFavouriteCities(cities));
    };
}
