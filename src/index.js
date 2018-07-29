import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import Root from './root';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const devTools = (process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null;
const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), devTools)
);

ReactDOM.render(<Root store = {store}/>, document.getElementById('root'));
