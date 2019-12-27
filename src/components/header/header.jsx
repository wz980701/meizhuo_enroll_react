import React from 'react'
import './header.scss'

class Header extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            // type: ''
        }
    }
    // componentDidMount () {
    //     this.state.type = this.props
    // }
    render () {
        const type = this.props.type
        return (
            <div className={`header ${type}`}>
                {this.props.children}
            </div>
        )
    }
}

export default Header
