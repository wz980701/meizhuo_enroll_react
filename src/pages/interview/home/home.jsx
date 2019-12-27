import React from 'react'
import {connect} from 'react-redux'
import {Container, Row, Col, Button} from 'react-bootstrap'
import Header from 'components/header/header.jsx'
import PopUp from 'components/popup/popup.jsx'
import api from 'api/api.js'
import './home.scss'

class InterviewHome extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            department: '',
            group: '',
            up_list: [
                {field: 's_id', col: 3},
                {field: 's_name', col: 1},
                {field: 's_major', col: 2},
                {field: 's_number', col: 3},
                {field: 's_grade', col: 1},
                {field: 's_department', col: 2}
            ],
            down_list: [
                {field: 's_apply', col: 3},
                {field: 's_intro', col: 9}
            ],
            interviewer_data: {}, // 面试者信息
            id: '', // 学号
            isShow: false,
            tips: '',
            isLogout: false
        }
    }
    componentDidMount () {
        this.initData()
    }
    async initData () {
        try {
            const interviewData = this.props.interviewData // 获取redux中的state
            this.setState({
                department: interviewData.department,
                group: interviewData.group
            })
        } catch (err) {
            console.log(err)
        }
    }
    toLogout = async e => {
        try {
            let params = {
                department: this.state.department,
                group: this.state.group
            }
            if (JSON.stringify(this.state.interviewer_data) !== '{}') { // 如果不为空，则传id
                this.setState({
                    tips: '还有面试者在面试噢，确定要退出登录吗？',
                    isShow: true
                })
                return
            }
            const result = await api.interviewLogout({
                params
            })
            if (result) { // 如果成功，则弹出信息，返回登录页
                this.props.history.push('/interview/login')
            }
        } catch (err) {
            console.log(err)
        }
    }
    getNextUser = async e => {
        const res = this.state.id ? await api.getNextUser({ // 如果是第一次请求，则id为空
            params: {
                id: this.state.id
            }
        }) : await api.getNextUser()
        this.setState({
            id: res.s_id,
            interviewer_data: {...res}
        })
    }
    onClose = async e => {
        this.setState({
            isShow: false
        })
    }
    onConfirm = async e => {
        let params = {
            department: this.state.department,
            group: this.state.group
        }
        params.id = this.state.interviewer_data.s_id
        const result = await api.interviewLogout({
            params
        })
        if (result) { // 如果成功，则弹出信息，返回登录页
            this.props.history.push('/interview/login')
        }
    }
    render () {
        const tbody = (list) => {
            return list.map((item, index) => {
                const content = this.state.interviewer_data[item.field]
                if (content) {
                    return (
                        <Col md={item.col} key={index}>
                            {content}
                        </Col>
                    )
                }
            })
        }
        return (
            <Container fluid>
                <Row>
                    <Header type="interview">
                        欢迎面试官，这里是{this.state.department}{this.state.group}
                    </Header>
                </Row>
                <Row className="justify-content-center">
                    <Col md={10} className="showDataBox">
                        <Row className="thead">
                            <Col md={3}>
                                学号
                            </Col>
                            <Col md={1}>
                                姓名
                            </Col>
                            <Col md={2}>
                                专业
                            </Col>
                            <Col md={3}>
                                联系方式
                            </Col>
                            <Col md={1}>
                                年级
                            </Col>
                            <Col md={2}>
                                意向部门
                            </Col>
                        </Row>
                        <Row className="tbody">
                            {
                                tbody(this.state.up_list)
                            }
                        </Row>
                        <Row className="thead">
                            <Col md={3}>
                                是否网上报名
                            </Col>
                            <Col md={9}>
                                简介
                            </Col>
                        </Row>
                        <Row className="tbody">
                            {
                                tbody(this.state.down_list)
                            }
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center btnGroup">
                    <Col md={5}>
                        <Button 
                            block 
                            className="exitBtn"
                            onClick={this.toLogout}
                        >退出</Button>
                    </Col>
                    <Col md={5}>
                        <Button 
                            block 
                            className="nextBtn"
                            onClick={this.getNextUser}
                        >下一个面试者</Button>
                    </Col>
                </Row>
                <PopUp
                    PopTip={this.state.tips}
                    PopStatus={this.state.isShow}
                    onConfirm={this.onConfirm}
                    onClose={this.onClose}
                />
            </Container>
        )
    }
}

export default connect(state => ({
    interviewData: state.interviewData
}))(InterviewHome)
