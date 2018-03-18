import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

import './assets/style.css';
import strings from './utils/localization'
strings.setLanguage('en');


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = applyMiddleware(
    promise(),
    thunk
);
let store = createStore(reducers, composeEnhancers(middlewares));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
