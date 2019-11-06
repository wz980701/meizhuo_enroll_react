import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './router';
import FastClick from 'fastclick';
import store from 'store/store.js';
import {Provider} from 'react-redux';


import 'style/cover.scss';
// bootstrap.css
import 'bootstrap/dist/css/bootstrap.css';

//globe css
import 'style/base.css';

FastClick.attach(document.body);

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>
        ,
        document.getElementById('app')
    )
}

render(Root)
