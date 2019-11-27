import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
        case actionTypes.ADD_NEW_FAVOURITE_CITY:
            console.log("State", state);
            for(let i = 0; i < state.length; i++){
                if(state[i].name === action.city.toString()){
                    return state;
                }
            }
            return [
                ...state,
                ({name: action.city.toString()})
            ];
        case actionTypes.DELETE_FAVOURITE_CITY:
            return state.filter(function(value, index, arr){
                return value.name !== action.city;
            });
        case actionTypes.SET_FAVOURITE_CITIES:
            let result = [...state];
            for(let i = 0; i < action.cities.length; i++){
                result = [...result, action.cities[i]];
            }
            return result;
        default:
            return state;
    }
};