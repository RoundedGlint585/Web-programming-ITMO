import { combineReducers } from 'redux';
import cities from './favouriteCityReducer';

export default combineReducers({
    cities: cities
});