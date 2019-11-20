import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import Header from 'components/header/header.jsx'
import api from 'api/api.js'
import _common from 'utils/_common'
import './login.scss'

class AuthLogin extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            formdata: {
                username: '',
                password: ''
            }
        }
    }
    changeValue = e => {
        const val = e.target.value
        const type = e.target.getAttribute("data-type")
        this.state.formdata[type] = val
    }
    toLogin = async e => {
        try {
            const data = _common.getFormdata(this.state.formdata)
            const res = await api.authLogin({data})
            alert(res.message)
            this.props.history.push('/auth/home')
        } catch (err) {
            console.log(err)
        }
    }
    render () {
        return (
            <Container fluid>
                <Row>
                    <Header type="auth">
                        <p className="login_head">后台管理系统</p>
                    </Header>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="login_form">
                        <Form>
                            <Form.Group controlId="username">
                                <Form.Control
                                    id="input"
                                    type="text"
                                    placeholder="账户"
                                    data-type="username"
                                    onChange={this.changeValue}
                                    className="username"
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control
                                    id="input"
                                    type="text"
                                    placeholder="密码"
                                    data-type="password"
                                    onChange={this.changeValue}
                                    className="password"
                                ></Form.Control>
                            </Form.Group>
                            <Button block onClick={this.toLogin} className="btn_auth">
                                登录
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AuthLogin
