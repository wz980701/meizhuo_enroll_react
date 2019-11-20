import React from 'react'
import Layout from 'components/layout/layout.jsx'
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom'
import './home.scss'

import List from 'pages/interview/auth/list/list.jsx'
import Detail from 'pages/interview/auth/detail/detail.jsx'
import Interviewer from 'pages/interview/auth/interviewer/interviewer.jsx'

class AuthHome extends React.Component {
    render () {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route 
                        exact 
                        path="/auth/applylist" 
                        component={() => <List state="apply" />} 
                    />
                    <Route 
                        exact 
                        path="/auth/interviewlist" 
                        component={() => <List state="interview" />} 
                    />
                    <Route exact path="/auth/detail" component={Detail} />
                    <Route exact path="/auth/interviewer" component={Interviewer} />
                    <Redirect exact from="/auth/home" to="/auth/applylist" />
                </Switch>
            </Layout>
        )
        return (
            <Router>
                <Switch>
                    <Route path="/" render={props => LayoutRouter} />
                </Switch>
            </Router>
        )
    }
}

export default AuthHome
