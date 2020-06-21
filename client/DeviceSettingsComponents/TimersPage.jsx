import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Jumbotron, ListGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

import NewTimerComponent from './NewTimerComponent';

import moment from 'moment';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);


class TimersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            showModal: false
        };

        this.handleAddNewTimer = this.handleAddNewTimer.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    handleAddNewTimer(value) {
        this.setState({ values: [...this.state.values, value] });
        this.setState({ showModal: !this.state.showModal });
    }

    handleHideModal() {
        this.setState({ showModal: !this.state.showModal });
    }


    render() {
        const { values, showModal } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        Timers
                        </Col>
                </Row>
                <ListGroup>
                    {values.map((value, index) =>
                        <ListGroup.Item key={index}>
                            <Row>
                                <Col>
                                    {value.timeValue}
                                </Col>
                                <Col>
                                    <Form.Check
                                        disabled
                                        type="switch"
                                        id= {"enabled"+ index}
                                        checked={value.isEnabled}
                                        label = "Action to Perform"
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>)}
                </ListGroup>

                <Row>
                    <Button onClick={() => this.setState({ showModal: !this.state.showModal })} variant="outline-primary"><i class="far fa-calendar-plus"></i> Add new</Button>
                </Row>

                <NewTimerComponent
                    show={showModal}
                    onHide={this.handleHideModal}
                    onSubmit={this.handleAddNewTimer}
                />
            </Container>
        )
    }
}


function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedTimersPage = connect(mapStateToProps)(TimersPage);
export { connectedTimersPage as TimersPage };