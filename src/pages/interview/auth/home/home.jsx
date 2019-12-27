import React from 'react'
import Layout from 'components/layout/layout.jsx'
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom'
import './home.scss'

import List from 'pages/interview/auth/list/list.jsx'
import Detail from 'pages/interview/auth/detail/detail.jsx'
import Interviewer from 'pages/interview/auth/interviewer/interviewer.jsx'
import ResultManage from 'pages/result/manage/manage.jsx'

class AuthHome extends React.Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    render () {
        let LayoutRouter = (
            <Layout history={this.props.history}>
                <Switch>
                    <Route
                        exact 
                        path="/auth/applylist" 
                        component={() => <List state="apply" history={this.props.history} />} 
                    />
                    <Route
                        exact 
                        path="/auth/interviewlist" 
                        component={() => <List state="interview" history={this.props.history} />} 
                    />
                    <Route exact path="/auth/detail" component={Detail} />
                    <Route exact path="/auth/interviewer" component={Interviewer} />
                    <Route exact path="/result/manage" component={ResultManage} />
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
