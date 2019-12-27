import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button} from 'react-bootstrap'
import './popup.scss'

class PopUp extends React.Component {
    static propTypes = {
        onConfirm: PropTypes.func.isRequired, // 点击确认触发的事件
        PopTip: PropTypes.string.isRequired, // 提示内容
        PopStatus: PropTypes.bool.isRequired, // 是否显示弹出框
        PopLight: PropTypes.bool.isRequired, // 是否为轻量级
    }
    constructor (props) {
        super(props)
        this.state = {
            isShow: this.props.PopStatus
        }
    }
    componentWillReceiveProps(nextProps) {
        this.handleShow(nextProps.PopStatus)
    }
    handleShow = async status => { // 点击显示
        this.setState({
            isShow: status
        })
    }
    handleClose = async e => { // 点击关闭
        this.setState({
            isShow: false
        })
        this.props.onClose() // 触发props的close事件
    }
    handleConfirm = async e => {
        this.props.onConfirm()
    }
    render () {
        return (
            <Modal show={this.state.isShow} onHide={this.handleClose}>
                <Modal.Header className="head">提示</Modal.Header>
                <Modal.Body className="body">{this.props.PopTip}</Modal.Body>
                {
                    this.props.PopLight ? // 判断弹出是否为轻量级
                        <Modal.Footer>
                            <Button onClick={this.handleClose} className="confirm_center_btn">
                                OK
                            </Button>
                        </Modal.Footer>
                        :
                        <Modal.Footer className="footer">
                            <Button variant="secondary" onClick={this.handleClose}>
                                取消
                            </Button>
                            <Button onClick={this.handleConfirm}>
                                确定
                            </Button>
                        </Modal.Footer>
                }
            </Modal>
        )
    }
}

export default PopUp
