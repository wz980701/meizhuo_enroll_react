import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import home from 'pages/home/home.jsx'

const Root = () => (
    <BrowserRouter>
        <div className="router-content">
            <Switch>
                <Route path="/" exact component={home} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default hot(module)(Root);
