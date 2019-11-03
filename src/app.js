import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './router';
import FastClick from 'fastclick';
import store from 'store/store.js';
import {Provider} from 'react-redux';

// bootstrap.css
import 'bootstrap/dist/css/bootstrap.css';

//globe css
import 'style/scss.scss';
import 'style/base.css';

FastClick.attach(document.body);

const render = Component => {
    ReactDOM.render(
        <Component />
        ,
        document.getElementById('app')
    )
}

render(Root)
