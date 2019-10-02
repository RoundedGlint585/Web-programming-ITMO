import {combineReducers} from 'redux'
import {
    ADD_FAVOURITE,
    DELETE_FAVOURITE
} from '../actions/index.js'

function favourite(state = [], action) {
    switch (action.type) {
        case ADD_FAVOURITE:
            return [
                ...state,
                {
                    name: action.name,
                }
            ];
        case DELETE_FAVOURITE:
            return state.filter((data, i) => i !== action.name);
        default:
            return state;
    }
}


export default favourite;