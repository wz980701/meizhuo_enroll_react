/* eslint-disable space-before-function-paren */
import React from 'react'

import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import Header from 'components/header/header.jsx'
import PopUp from 'components/popup/popup.jsx'

import './apply.scss'
import 'style/cover.scss'

import _common from 'utils/_common'
import api from 'api/api.js'
import {RES_OK} from 'env/constant.js'

class SignUp extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isShow: false,
            tips: '是否退出',
            department_list: [],
            grade_list: [],
            formdata: {
                s_department: '前端',
                s_grade: '大一'
            },
            input_list: [
                {
                    field: 's_name',
                    placeholder: '姓名',
                    state: false,
                    tips: '*请正确填写姓名'
                },
                {
                    field: 's_id',
                    placeholder: '学号',
                    state: false,
                    tips: '*请正确填写学号'
                },
                {
                    field: 's_major',
                    placeholder: '专业',
                    state: false,
                    tips: '*请正确填写专业'
                },
                {
                    field: 's_number',
                    placeholder: '手机号码',
                    state: false,
                    tips: '*请正确填写手机号码'
                }
            ]
        }
    }
    componentDidMount () {
        this.initData()
    }
    initData = async () => {
        try {
            this.setState({ // 初始化列表
                department_list: await api.getDepartmentList(),
                grade_list: await api.getGradeList()
            })
        } catch (err) {
            console.log(err)
        }
    }
    changeValue = async (e, index) => { // 输入时进行验证
        const value = e.target.value
        const type = this.state.input_list[index].field
        const res = !_common.validate(value, type)
        let formdata = this.state.formdata // 在验证时修改formdata对应值
        formdata[type] = value
        this.setState({
            formdata
        })
        this.changeInputState(res, index)
    }
    handleChange = async e => { // 不用验证值的表单修改formdata
        const value = e.target.value
        const type = e.target.getAttribute("data-type")
        let formdata = this.state.formdata
        formdata[type] = value
        this.setState({
            formdata
        })
    }
    changeInputState = (res, index) => { // 若验证有误修改state
        this.state.input_list[index].state = res
        this.setState({
            input_list: this.state.input_list
        })
    }
    onSubmit = async () => {
        try {
            let formdata = _common.getFormdata(this.state.formdata)
            let res = await api.applySubmit({data: formdata})
            if (res.code === RES_OK) {
                this.setState({
                    isShow: true,
                    tips: '报名成功',
                    formdata: {
                        s_name: '',
                        s_id: '',
                        s_major: '',
                        s_number: '',
                        s_intro: '',
                        s_department: '前端',
                        s_grade: '大一'
                    }
                })
            } else {
                this.setState({
                    isShow: true,
                    tips: '报名失败',
                    formdata: {
                        s_name: '',
                        s_id: '',
                        s_major: '',
                        s_number: '',
                        s_intro: '',
                        s_department: '前端',
                        s_grade: '大一'
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    onClose = async () => {
        this.setState({
            isShow: false
        })
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
                <Row className="apply_head">
                    <Header type="apply">
                        招新报名
                    </Header>
                </Row>
                <Row className="justify-content-center apply_form">
                    <Col md={6}>
                        <Form>
                            {
                                this.state.input_list.map((item, index) => {
                                    return (
                                        <Form.Group 
                                            controlId={item.field}
                                            key={index}
                                            data-tips={item.tips}
                                            className={item.state ? 'errorTips' : ''}
                                        >
                                            <Form.Control
                                                id="input"
                                                type="text"
                                                placeholder={item.placeholder}
                                                value={this.state.formdata[item.field]}
                                                onChange={(e) => { this.changeValue(e, index) }}
                                                className={item.state ? 'error' : ''}
                                            ></Form.Control>
                                        </Form.Group>
                                    )
                                })
                            }
                            <Form.Group controlId="grade">
                                <Form.Control 
                                    as="select" 
                                    id="input" 
                                    data-type="s_grade"
                                    value={this.state.formdata.s_grade}
                                    onChange={this.handleChange}
                                >
                                    {
                                        multiOption(this.state.grade_list)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="department">
                                <Form.Control 
                                    as="select" 
                                    id="input"
                                    data-type="s_department" 
                                    value={this.state.formdata.s_department}
                                    onChange={this.handleChange}
                                >
                                    {
                                        multiOption(this.state.department_list)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="intro">
                                <Form.Control
                                    id="input"
                                    as="textarea"
                                    rows="4"
                                    placeholder="请填写你的爱好，部门，能力等，尽可能全面"
                                    data-type="s_intro"
                                    value={this.state.formdata.s_intro}
                                    onChange={this.handleChange}
                                ></Form.Control>
                            </Form.Group>
                            <Button block onClick={this.onSubmit} className="btn-apply">
                                提交
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <PopUp
                    PopLight="true"
                    PopTip={this.state.tips}
                    PopStatus={this.state.isShow}
                    onClose={this.onClose}
                />
            </Container>              
        );
    }
}

export default SignUp
