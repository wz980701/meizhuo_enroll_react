import React from 'react'
import _common from 'utils/_common.js'
import {Link} from 'react-router-dom'
import './navside.scss'
import imgURL from '../../assets/mz.png'

class NavSide extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }
    render () {
        return (
            <div className="navSide">
                <div className="nav_brand">
                    {/* <img
                        className="nav_logo"
                        src={imgURL}
                        alt="logo"
                    /> */}
                    <p className="nav_text">hr,欢迎您</p>
                </div>
                <ul className="nav_list">
                    <li className="nav_item">
                        <Link className="nav_link" to="/auth/applylist">
                            <i className="iconfont iconlist" />
                            <p>所有报名同学查看</p>
                        </Link>
                    </li>
                    <li className="nav_item">
                        <Link className="nav_link" to="/auth/interviewlist">
                            <i className="iconfont iconlist" />
                            <p>所有面试同学查看</p>
                        </Link>
                    </li>
                    <li className="nav_item">
                        <Link className="nav_link" to="/auth/interviewer">
                            <i className="iconfont iconlist" />
                            <p>管理面试官</p>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavSide
