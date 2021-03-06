import React from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import api from 'api/api.js'
import {RES_OK} from 'env/constant.js'
import './interviewer.scss'

class Interviewer extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            list: [],
            isShow: false
        }
    }
    componentDidMount () {
        this.initData()
    }
    async initData () {
        try {
            const listData = await api.getInterviewList()
            const list = listData.data
            if (list.length > 0) {
                this.setState({
                    list
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    async toLogout (index, group, department) { // 面试官退出登录
        try {
            const isLogout = await api.interviewLogout({
                params: {
                    group,
                    department
                }
            })
            if (isLogout.code === RES_OK) {
                let list = this.state.list
                list.splice(index, 1)
                this.setState({
                    list
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    render () {
        const tbody = (list) => {
            return list.map((item, index) => {
                return (
                    <Row className="tbody" key={index}>
                        <Col md={2}>
                            {item.id}
                        </Col>
                        <Col md={2}>
                            {item.h_group}
                        </Col>
                        <Col md={4}>
                            {item.h_department}
                        </Col>
                        <Col md={4}>
                            <Button
                                className="btn-exit logout_btn"
                                onClick={() => { this.toLogout(index, item.h_group, item.h_department) }}
                            >
                                退出登录
                            </Button>
                        </Col>
                    </Row>
                )
            })
        }
        return (
            <Container>
                <Row className="interviewer_box">
                    <Container className="interviewer_container">
                        <Row className="thead">
                            <Col md={2}>
                                id
                            </Col>
                            <Col md={2}>
                                组别
                            </Col>
                            <Col md={4}>
                                组名
                            </Col>
                        </Row>
                        {
                            tbody(this.state.list)
                        }
                    </Container>
                </Row>
            </Container>
        )
    }
}

export default Interviewer
