import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

export default function configureStore(initialState) {
    return createStore(rootReducer, persistedState,
        applyMiddleware(thunk));
}