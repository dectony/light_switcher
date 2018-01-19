import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { PrivateRoute } from './_components';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { NewDevicePage } from './DeviceComponents';
import { MyHousesPage, EditHousePage, ManageHousePage } from './AutomatedHomePage';


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
                    <Route path="/houses" component={MyHousesPage} />
                    <Route path="/edit/house/:houseId" component={EditHousePage}/>
                    <Route path="/house/manage/:houseId" component={ManageHousePage}/>
                    <Route path="/device/add/:roomId" component={NewDevicePage}/>
                </App>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);