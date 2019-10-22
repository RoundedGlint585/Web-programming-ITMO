import {createStore} from 'redux';
import rootReducer from '../reducers';



const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};


export default function configureStore(initialState) {
    return createStore(rootReducer, persistedState);
}