import React from 'react'
import _common from 'utils/_common.js'
import './detail.scss'
import {Container, Row, Col} from 'react-bootstrap'
import api from 'api/api.js'

class Detail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            up_list: [
                {field: 's_id', col: 3},
                {field: 's_name', col: 1},
                {field: 's_major', col: 2},
                {field: 's_number', col: 3},
                {field: 's_grade', col: 1},
                {field: 's_department', col: 2}
            ],
            down_list: [
                {field: 's_intro', col: 12}
            ],
            user_data: {}, // 面试者信息
        }
    }
    componentDidMount () {
        this.initData()
    }
    async initData () {
        try {
            const id = _common.getSessionStore("user_id") // 获取用户id
            const data = await api.getUserDetail({
                params: {
                    id
                }
            })
            if (data && JSON.stringify(data) !== '{}') {
                this.setState({
                    user_data: data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    render () {
        const tbody = (list) => {
            return list.map((item, index) => {
                const content = this.state.user_data[item.field]
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
            <Container>
                <Row className="detail_box">
                    <Container className="detail_container">
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
                            <Col md={12} style={{textAlign: 'center'}}>
                                简介
                            </Col>
                        </Row>
                        <Row className="tbody">
                            {
                                tbody(this.state.down_list)
                            }
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}

export default Detail
