import * as actionTypes from './actionTypes';
import {fetchWeatherDataByName} from "../utils";

export const addFavouriteCity = (city) => {
    return {
        type: actionTypes.ADD_NEW_FAVOURITE_CITY,
        city: city
    }
};

export const deleteFavouriteCity = (id) => {
    return {
        type: actionTypes.DELETE_FAVOURITE_CITY,
        id: id
    }
};


export function validateAndAddCity(city) {
    return (dispatch) => {
        fetchWeatherDataByName(city, function(response){
            if (response.cod === 200) {
                dispatch(addFavouriteCity(city));
            } else {
                alert("City not found");
            }
            }
        );
    };
}

export function deleteCity(id){
    return (dispatch) => {
        dispatch(deleteFavouriteCity(id))
    };
}