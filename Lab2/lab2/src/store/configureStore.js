import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers';

import createSagaMiddleware from 'redux-saga'


const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    return createStore(rootReducer, persistedState,
        applyMiddleware(sagaMiddleware));
}