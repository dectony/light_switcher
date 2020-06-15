import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { AutomatedHomePage } from '../AutomatedHomePage';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import MyNavigationBar from "../Navbar/Navbar";

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div id="outer-container">
                <div>
                    <MyNavigationBar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
                    <Container>
                        <Row>
                            <Col>
                                <div id="page-wrap">
                                    {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>}
                                <div><button onClick={history.goBack}>Go Back</button></div>
                                    {this.props.children}
                                </div>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };