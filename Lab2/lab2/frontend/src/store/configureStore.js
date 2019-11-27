import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import {fetchFavouritesCities} from "../utils";



export default function configureStore(initialState) {
    return createStore(rootReducer,  applyMiddleware(thunk));
}