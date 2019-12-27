import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Search from 'components/search/search.jsx'
import PopUp from 'components/popup/popup.jsx'
import './result.scss'
import imgURL from '../../assets/logo.jpg'
import api from 'api/api.js'

class Result extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isShow: false,
            tips: ''
        }
    }
    getResult = async content => {
        try {
            let res = await api.getResult({
                params: {
                    value: content
                }
            })
            if (!res.s_result) {
                this.setState({
                    tips: '面试结果未出',
                    isShow: true
                })
            } else {
                this.setState({
                    tips: res.s_result,
                    isShow: true
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    onClose = async e => {
        this.setState({
            isShow: false
        })
    }
    render () {
        return (
            <Container>
                <Row className="logo_box justify-content-center">
                    {/* <Col md={5}>
                        <img
                            className="logo"
                            src={imgURL} 
                            alt="logo" 
                        />
                    </Col> */}
                    <Col md={5} className="title">
                        <h1>面试管理系统</h1>
                    </Col>
                </Row>
                <Row className="search_box justify-content-center">
                    <Col md={8}>
                        <Search type="getResult" onSearch={this.getResult} />
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

export default Result
