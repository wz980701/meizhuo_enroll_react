import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import SignUp from 'pages/apply/apply.jsx'
import InterviewLogin from 'pages/interview/login/login.jsx'
import InterviewHome from 'pages/interview/home/home.jsx'
import AuthLogin from 'pages/interview/auth/login/login.jsx'
import AuthHome from 'pages/interview/auth/home/home.jsx'

const Root = () => (
    <BrowserRouter>
        <div className="router-content">
            <Switch>
                <Route path="/apply" exact component={SignUp} />
                <Route path="/interview/login" exact component={InterviewLogin} />
                <Route path="/interview/home" exact component={InterviewHome} />
                <Route path="/auth/login" exact component={AuthLogin} />
                <Route path="/auth/home" exact component={AuthHome} />
                <Redirect exact from="/interview" to="/interview/login" />
                <Redirect from="/auth" to="/auth/home" />
            </Switch>
        </div>
    </BrowserRouter>
);

export default hot(module)(Root);
