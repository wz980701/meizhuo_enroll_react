import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import SignUp from 'pages/apply/apply.jsx'
import InterviewLogin from 'pages/interview/login/login.jsx'

const Root = () => (
    <BrowserRouter>
        <div className="router-content">
            <Switch>
                <Route path="/apply" exact component={SignUp} />
                <Route path="/interview/login" exact component={InterviewLogin} />
                <Redirect exact from="/interview" to="/interview/login" />
            </Switch>
        </div>
    </BrowserRouter>
);

export default hot(module)(Root);
