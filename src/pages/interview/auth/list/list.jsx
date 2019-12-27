import React from 'react'
import api from 'api/api.js'
import _common from 'utils/_common.js'
import Search from 'components/search/search.jsx'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Form, Button, Pagination} from 'react-bootstrap'
import {RES_OK, RES_ERR} from 'env/constant.js'
import './list.scss'

class List extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            type: 'detail',
            type_tips: '修改面试状态',
            user_state: '',
            list: [],
            department: '',
            page: 1,
            limit: 10,
            sum: 0,
            department_list: [
                '所有人', '前端', '后台', '营销', '美工'
            ]
        }
    }
    componentDidMount () {
        this.initData()
    }
    initData = async () => {
        try {
            if (this.props.state === 'interview') { // 如果props的state为已面试，则改变state的user_state数据
                this.state.user_state = '已面试'
            }
            const data = await api.getUserList({
                params: {
                    state: this.state.user_state
                }
            })
            this.setState({
                list: data.user_list,
                sum: data.sum
            })
        } catch (err) {
            const code = err.response.code
            if (code === RES_ERR) {
                this.props.history.push('/auth/login')
            }
        }
    }
    handleSelectChange = async e => { // 不用验证值的表单修改formdata
        const value = e.target.value
        let data
        if (value === '所有人') { // 如果select值为所有人，则不传group
            data = await api.getUserList({
                params: {
                    state: this.state.user_state
                }
            })
        } else {
            data = await api.getUserList({
                params: {
                    state: this.state.user_state,
                    group: value
                }
            })
        }
        this.setState({
            list: data.user_list,
            sum: data.sum,
            department: value
        })
    }
    handlePageChange = async e => { // 点击分页器重新获取列表数据
        const pageNumber = e.target.text
        const val = await api.getUserList({
            params: {
                page: pageNumber,
                state: this.state.user_state
            }
        })
        this.setState({
            list: val.user_list,
            sum: val.sum,
            page: pageNumber
        })
    }
    saveUserId (id) { // 保存用户id
        _common.setSessionStore("user_id", id)
    }
    toSearch = async (content) => { // 搜索获取列表
        try {
            if (content.length === 0 || this.props.state === 'interview') { // 如果搜索内容为空
                this.initData()
            } else {
                const data = await api.getSearch({
                    params: {
                        val: content
                    }
                })
                this.setState({
                    list: data.data,
                    sum: data.sum
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    toModify = async () => { // 点击切换修改状态UI
        this.setState({
            type: this.state.type === 'detail' ? 'modify' : 'detail',
            type_tips: this.state.type_tips === '修改面试状态' ? '取消修改' : '修改面试状态'
        })
    }
    changePassState = async (index, state) => { // 修改面试者状态
        try {
            let id = this.state.list[index].id
            const data = await api.getChangePass({
                params: {
                    id,
                    state
                }
            })
            if (data) {
                let list = this.state.list
                list[index].s_pass = state
                this.setState({
                    list
                })
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
        let items = []
        let that = this
        for (let number = 1; number <= Math.ceil(this.state.sum / this.state.limit); number++) { // 获取分页器
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === Number(this.state.page)}
                >
                    {number}
                </Pagination.Item>
            )
        }
        const tbody = (list) => {
            return list.map((item, index) => {
                return (
                    <Row className="tbody" key={index}>
                        <Col md={1}>
                            {item.id}
                        </Col>
                        <Col md={2}>
                            {item.s_id}
                        </Col>
                        <Col md={1}>
                            {item.s_name}
                        </Col>
                        <Col md={2}>
                            {item.s_major}
                        </Col>
                        <Col md={1}>
                            {item.s_grade}
                        </Col>
                        <Col md={1}>
                            {item.s_department}
                        </Col>
                        <Col md={2}>
                            {_common.timestampToExpectedTime(item.s_createtime)}
                        </Col>
                        <Col md={2}>
                            {
                                this.state.type === 'detail' ?
                                    <Link to="/auth/detail" onClick={(e) => { this.saveUserId(item.id) }}>
                                        <Button
                                            className="btn-apply detail_btn"
                                        >
                                            详情
                                        </Button>
                                    </Link> 
                                    :
                                    <div>
                                        <span className="user_pass">{item.s_pass}</span>
                                        {
                                            item.s_pass === '未通过' ?
                                                <Button 
                                                    variant="outline-success"
                                                    className="pass_btn"
                                                    onClick={(e) => { that.changePassState(index, '通过') }}
                                                >通过</Button> :
                                                <Button 
                                                    variant="outline-danger"
                                                    className="pass_btn"
                                                    onClick={(e) => { that.changePassState(index, '未通过') }}
                                                >未通过</Button>
                                        }
                                    </div>
                            }
                        </Col>
                    </Row>
                )
            })
        }
        return (
            <Container>
                <Row>
                    <Search onSearch={this.toSearch} type="search" />
                </Row>
                <Row className="list_box">
                    <Container className="list_container">
                        <Row className="list_head">
                            <div>
                                <div className="list_select">
                                    <Form.Group controlId="department">
                                        <Form.Control 
                                            as="select" 
                                            id="input"
                                            data-type="s_department" 
                                            onChange={this.handleSelectChange}
                                        >
                                            {
                                                multiOption(this.state.department_list)
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                {
                                    this.props.state === 'interview' ?
                                        <div>
                                            <Link to="/result/manage">
                                                <Button
                                                    className="btn-apply btn_result"
                                                >编写面试结果</Button>
                                            </Link>
                                            <Button 
                                                className="btn-exit btn_modify"
                                                onClick={this.toModify}
                                            >
                                                {this.state.type_tips}
                                            </Button>
                                        </div>
                                        :
                                        <div />
                                }
                            </div>
                            <p className="apply_sum">
                                总报名人次：{this.state.sum}人次
                            </p>
                        </Row>
                        <Row className="list_content">
                            <Col>
                                <Row className="thead">
                                    <Col md={1}>
                                        序号
                                    </Col>
                                    <Col md={2}>
                                        学号
                                    </Col>
                                    <Col md={1}>
                                        姓名
                                    </Col>
                                    <Col md={2}>
                                        专业
                                    </Col>
                                    <Col md={1}>
                                        年级
                                    </Col>
                                    <Col md={1}>
                                        面试部门
                                    </Col>
                                    <Col md={2}>
                                        报名时间
                                    </Col>
                                </Row>
                                {
                                    tbody(this.state.list)
                                }
                            </Col>
                        </Row>
                        {
                            this.state.sum > this.state.limit ? ( // 如果记录大于limit则显示分页器
                                <Row className="list_pagination_box justify-content-center">
                                    <Col>
                                        <Pagination
                                            className="list_pagination"
                                            onClick={this.handlePageChange}
                                            size="sm"
                                        >{items}</Pagination>
                                    </Col>
                                </Row>
                            ) : (
                                <div />
                            )
                        }
                    </Container>
                </Row>
            </Container>
        )
    }
}

export default List
