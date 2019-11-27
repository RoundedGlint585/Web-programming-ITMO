import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


const store = configureStore();

store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));