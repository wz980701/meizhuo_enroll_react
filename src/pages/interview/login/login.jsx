import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {saveInterviewer} from 'store/interview/action'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import Header from 'components/header/header.jsx'
import api from 'api/api.js'
import _common from 'utils/_common'
import './login.scss'

class InterviewLogin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            department_list: [],
            group_list: [],
            formdata: {
                department: '前端',
                group: 1
            }
        }
    }
    componentDidMount () {
        this.initData()
    }
    async initData () {
        try {
            this.setState({ // 初始化列表
                department_list: await api.getDepartmentList(),
                group_list: await api.getGroupList()
            })
        } catch (err) {
            console.log(err)
        }
    }
    handleChange = async e => { // 修改formdata
        const value = e.target.value
        const type = e.target.getAttribute("data-type")
        this.state.formdata[type] = value
    }
    toLogin = async e => { // 点击登录
        try {
            const data = this.state.formdata
            let formdata = _common.getFormdata(data)
            let result = await api.interviewLogin({data: formdata})
            if (result) {
                this.props.saveInterviewer(data)
                this.props.history.push('/interview/home')
            } else {
                alert('登录失败')
            }
        } catch (err) {
            console.log(err)
        }
    }
    render () {
        const multiOption = (list) => { // 遍历list获取option
            return list.map((item, index) => {
                return (
                    <option key={index}>{item}</option>
                )
            })
        }
        return (
            <Container fluid>
                <Row>
                    <Header type="interview">
                        面试官认证
                    </Header>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="login_form">
                        <Form>
                            <Form.Group controlId="department">
                                <Form.Control 
                                    as="select" 
                                    id="input" 
                                    data-type="department"
                                    onChange={this.handleChange}
                                >
                                    {
                                        multiOption(this.state.department_list)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="group">
                                <Form.Control 
                                    as="select" 
                                    id="input" 
                                    data-type="group"
                                    onChange={this.handleChange}
                                >
                                    {
                                        multiOption(this.state.group_list)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button block onClick={this.toLogin} className="btn-interview">
                                登录
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

InterviewLogin.propTypes = {
    saveInterviewer: PropTypes.func.isRequired
}

export default connect(state => ({
    interviewData: state.interviewData
}), {
    saveInterviewer
})(InterviewLogin)
