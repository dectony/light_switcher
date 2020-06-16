import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Jumbotron, ListGroup } from 'react-bootstrap'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import NewScheduleComponent, { Test } from './NewScheduleComponent';

import moment from 'moment';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);


class SchedulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],
            showModal: false
        };

        this.handleAddNewSchedule = this.handleAddNewSchedule.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    handleAddNewSchedule(value) {
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
                <Test />
                <Row>
                    <Col>
                        Schedules
                        </Col>
                </Row>
                <ListGroup>
                    {values.map((value, index) => <ListGroup.Item key = {index}>{value}</ListGroup.Item>)}
                </ListGroup>
                
                <Row>
                    <Button onClick={() => this.setState({ showModal: !this.state.showModal })} variant="outline-primary"><i class="far fa-calendar-plus"></i> Add new</Button>
                </Row>

                <NewScheduleComponent
                    show={showModal}
                    onHide={this.handleHideModal}
                    onSubmit={this.handleAddNewSchedule}
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

const connectedSchedulePage = connect(mapStateToProps)(SchedulePage);
export { connectedSchedulePage as SchedulePage };