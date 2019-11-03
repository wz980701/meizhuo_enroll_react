/* eslint-disable space-before-function-paren */
import React from 'react'

import Alert from 'react-bootstrap/Alert'

class home extends React.Component {
    render () {
        return (
            <Alert dismissible variant="danger">
                <Alert.Heading>Oh snap!</Alert.Heading>
                <p>
                    haha
                </p>
            </Alert>
        );
    }
}

export default home
