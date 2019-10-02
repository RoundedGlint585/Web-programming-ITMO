import {createStore} from 'redux';
import FavouriteReducer from "./FavouriteReducer";

export default function configureStore(initialState) {
    return createStore(FavouriteReducer, initialState);
}