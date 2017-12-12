import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import {PrivateRoute} from "./PrivateRoute";


export default (
    <Route path="/" component={App}>
        <PrivateRoute component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
    </Route>
);
