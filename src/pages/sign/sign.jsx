import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import PopUp from 'components/popup/popup.jsx'
import api from 'api/api.js'
import _common from 'utils/_common'
import './sign.scss'

class Sign extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isShow: false,
            tips: '',
            formdata: {
                group: '',
                name: '',
                id: ''
            },
            department_list: [],
            sign_list: {}
        }
    }
    componentDidMount () {
        this.initData()
    }
    async initData () {
        try {
            const departmentList = await api.getDepartmentList()
            const signList = await api.getSignList()
            if (departmentList.length > 0) {
                this.setState({
                    department_list: departmentList,
                    sign_list: signList
                })
            }
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
    toSign = async e => { // 签到
        try {
            const data = this.state.formdata
            let formdata = _common.getFormdata(data)
            let result = await api.toSign({data: formdata})
            if (result) {
                this.setState({
                    isShow: true,
                    tips: '签到成功'
                })
            } else {
                this.setState({
                    isShow: true,
                    tips: '输入信息有误，请重新输入'
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    toRefresh = async e => { // 刷新，重新获取列表数据
        this.initData()
    }
    delSign = async (index, id, key) => { // 删除签到者
        try {
            const res = await api.getSignDel({
                params: {
                    id
                }
            })
            if (res) {
                let list = this.state.sign_list
                list[key].splice(index, 1)
                this.setState({
                    sign_list: list
                })
            } else {
                alert('删除失败')
            }
        } catch (err) {
            console.log(err)
        }
    }
    onClose = async () => {
        this.setState({
            isShow: false,
            formdata: {
                name: '',
                id: '',
                group: ''
            }
        })
        this.initData()
    }
    render () {
        const multiOption = (list) => { // 遍历list获取option
            return list.map((item, index) => {
                return (
                    <option key={index}>{item}</option>
                )
            })
        }
        const multiList = (obj) => { // 遍历签到列表
            let list = []
            Object.keys(obj).forEach((key) => {
                list.push(
                    <Col md={3}>
                        <div className="sign_item">
                            <div className="item_head">
                                {key}
                            </div>
                            <ul className="item_body">
                                {
                                    obj[key].map((item, index) => {
                                        return (
                                            <li
                                                data-id={item.s_id}
                                                className="item" 
                                                key={index}
                                            >
                                                <p className="name">{item.s_name}</p>
                                                <p className="state">{item.s_state}</p>
                                                <i 
                                                    className="iconfont iconshanchu icon"
                                                    onClick={e => { this.delSign(index, item.s_id, key) }}
                                                />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </Col>
                )
            })
            return list
        }
        return (
            <Container>
                <Row className="input_box justify-content-center">
                    <Col md={8}>
                        <Form className="input_group">
                            <Form.Group as={Row}>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="姓名"
                                        type="text"
                                        value={this.state.formdata.name}
                                        data-type="name"
                                        id="input"
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="学号"
                                        type="text"
                                        value={this.state.formdata.id}
                                        id="input"
                                        data-type="id"
                                        md={4}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control 
                                        as="select" 
                                        id="input" 
                                        value={this.state.formdata.group}
                                        data-type="group"
                                        md={4}
                                        onChange={this.handleChange}
                                    >
                                        <option hidden selected>意向部门</option>
                                        {
                                            multiOption(this.state.department_list)
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Button className="btn-apply sign_btn" onClick={this.toSign}>签到</Button>
                                <Button className="btn-exit refresh_btn" onClick={this.toRefresh}>刷新</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="sign_list">
                    {
                        multiList(this.state.sign_list)
                    }
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

export default Sign

