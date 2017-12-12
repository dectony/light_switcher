import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { CreateHomePage } from './AutomatedHomePage';

import { store } from './_helpers';
import { history } from './_helpers';
import { App } from './App';

render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <App>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/homes" component={CreateHomePage} />
                </App>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);