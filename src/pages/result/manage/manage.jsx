import React from 'react'
import './manage.scss'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import PopUp from 'components/popup/popup.jsx'
import api from 'api/api.js'
import _common from 'utils/_common'

class ResultManage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            department_list: [],
            formdata: {
                department: '',
                result: '',
                pass: '未通过',
                tips: '',
                isShow: false
            }
        }
    }
    componentDidMount () {
        this.initData()
    }
    initData = async () => {
        try {
            const departmentList = await api.getDepartmentList()
            let formdata = this.state.formdata
            formdata.department = departmentList[0]
            this.setState({ // 初始化列表
                department_list: departmentList
            })
        } catch (err) {
            console.log(err)
        }
    }
    handleChange = async e => { // 修改formdata
        const value = e.target.value
        const type = e.target.getAttribute("data-type")
        let formdata = this.state.formdata
        formdata[type] = value
        this.setState({
            formdata
        })
    }
    handleRadioChange = async e => { // 修改单选框值
        let formdata = this.state.formdata
        formdata.pass = e.target.value
        this.setState({
            formdata
        })
    }
    onSubmit = async e => { // 提交表单
        try {
            let formdata = _common.getFormdata(this.state.formdata)
            let result = await api.setResult({data: formdata})
            if (result) {
                this.setState({
                    tips: '提交成功',
                    isShow: true
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
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} className="manage_box">
                        <Form.Group controlId="department">
                            <Form.Control 
                                as="select"
                                id="input" 
                                data-type="department"
                                value={this.state.formdata.department}
                                onChange={this.handleChange}
                            >
                                {
                                    multiOption(this.state.department_list)
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="result">
                            <Form.Control
                                id="input"
                                as="textarea"
                                rows="4"
                                placeholder="请填写面试结果"
                                data-type="result"
                                value={this.state.formdata.result}
                                onChange={this.handleChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="pass">
                            <Form.Check
                                inline
                                type="radio"
                                label="未通过"
                                value="未通过"
                                checked={this.state.formdata.pass === '未通过'}
                                onChange={this.handleRadioChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="通过"
                                value="通过"
                                checked={this.state.formdata.pass === '通过'}
                                onChange={this.handleRadioChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="submit">
                            <Button block onClick={this.onSubmit} className="btn-apply">
                                提交
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
                <PopUp
                    PopLight="true"
                    PopTip={this.state.tips}
                    PopStatus={this.state.isShow}
                    onClose={this.onClose}
                />
            </Container>
        )
    }
}

export default ResultManage
