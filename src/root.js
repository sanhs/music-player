import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <Router history={createBrowserHistory()}>
                <Route path="/" component={App}/>
            </Router>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;