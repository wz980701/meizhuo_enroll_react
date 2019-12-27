import React from 'react'
import PropTypes from 'prop-types'
import {Container, Row, Col, Form, Button, InputGroup} from 'react-bootstrap'
import './search.scss'

class Search extends React.Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        type: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        this.state = {
            content: '' // 搜索内容
        }
    }
    changeValue = e => {
        const val = e.target.value
        this.state.content = val
        if (this.props.type === 'search') { // 如果是搜索
            this.props.onSearch(val)
        }
    }
    onSearch = e => {
        this.props.onSearch(this.state.content)
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
                                    onClick={this.onSearch}
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
