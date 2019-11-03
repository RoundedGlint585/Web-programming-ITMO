import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
        case actionTypes.ADD_NEW_FAVOURITE_CITY:
            console.log("Test city:", action.city);
            return [
                ...state,
                ({name: action.city.toString()})
            ];
        case actionTypes.DELETE_FAVOURITE_CITY:
            return state.filter((data, i) => i !== action.id);
        default:
            return state;
    }
};