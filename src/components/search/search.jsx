import React from 'react'
import {Container, Row, Col, Form, Button, InputGroup} from 'react-bootstrap'
import './search.scss'

class Search extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    changeValue = e => {
        const val = e.target.value
        this.state.content = val
    }
    render () {
        return (
            <Container>
                <Row style={{marginTop: '40px'}}>
                    <Col>
                        <InputGroup className="mb-3">
                            <Form.Control
                                id="input"
                                type="text"
                                placeholder="请输入学号或姓名"
                                onChange={this.changeValue}
                                className="search_input"
                            ></Form.Control>
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    id="search_btn"
                                >
                                    <i className="iconfont iconsousuo" />
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Search
