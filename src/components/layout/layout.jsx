import React from 'react';
import Header from 'components/header/header.jsx'
import NavSide from 'components/navside/navside.jsx'
import './layout.scss'

class Layout extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <NavSide />
                <div className="main">
                    <Header type="auth_home">
                        后台管理系统
                    </Header>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout
