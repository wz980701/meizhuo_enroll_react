import React from 'react';
import Header from 'components/header/header.jsx'
import NavSide from 'components/navside/navside.jsx'
import PopUp from 'components/popup/popup.jsx'
import './layout.scss'
import api from 'api/api.js'

class Layout extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isShow: false,
            tips: '是否退出登录？'
        }
    }
    toLogout = async () => {
        this.setState({
            isShow: true
        })
    }
    onClose = async () => {
        this.setState({
            isShow: false
        })
    }
    onConfirm = async () => {
        const res = await api.authLogout()
        this.setState({
            isShow: false
        })
        if (res) {
            this.props.history.push('/auth/login')
        } else {
            alert('退出失败')
        }
    }
    render() {
        return (
            <div id="wrapper">
                <NavSide />
                <div className="main">
                    <Header type="auth_home">
                        <div className="left_head">
                            <i className="iconfont iconmore" />
                            <p>后台管理系统</p>
                        </div>
                        <div
                            className="right_head"
                            onClick={this.toLogout}
                        >
                            退出登录
                        </div>
                    </Header>
                    {this.props.children}
                </div>
                <PopUp
                    PopTip={this.state.tips}
                    PopStatus={this.state.isShow}
                    onClose={this.onClose}
                    onConfirm={this.onConfirm}
                />
            </div>
        )
    }
}

export default Layout
