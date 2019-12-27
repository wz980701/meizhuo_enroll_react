import React from 'react'
import './error.scss'

class Error extends React.Component {
    render () {
        return (
            <div className="box">
                <h1 className="title">
                    出错啦！
                </h1>
                <div>
                    <span>找不到该路径,</span>
                    <a href="/apply">点击返回报名页面</a>
                </div>
            </div>
        )
    }
}

export default Error

