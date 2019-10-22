import * as actionTypes from './actionTypes';

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
}