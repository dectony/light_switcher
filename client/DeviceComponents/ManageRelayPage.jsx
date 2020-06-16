import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button, Jumbotron } from 'react-bootstrap'

import { StopwatchIcon, HistoryIcon, CalendarIcon } from '@primer/octicons-react'

import { roomsActions, devicesActions } from '../_actions';
import Toggle from 'react-toggle'


class ManageRelayPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(devicesActions.getDevice(this.props.match.params.deviceId));
    }

    render() {
        const { devices } = this.props;

        return (
            <Jumbotron>
                <Container>
                    <Row>Manage Relay Page</Row>
                    <Row>
                        <Col>{devices.deviceToManage && devices.deviceToManage.title}</Col>
                        <Col>IsEnabled: {devices.deviceToManage && devices.deviceToManage.isEnabled}</Col>
                        <Col>
                            <Toggle
                                defaultChecked={devices.deviceToManage && devices.deviceToManage.isEnabled} />
                        </Col>
                    </Row>
                    <Row>
                        <Col><Link to="/login"><Button variant="outline-primary"><StopwatchIcon size={16} /> Set Up timer...</Button></Link></Col>
                        <Col><Link to={"/schedules/" + this.props.match.params.deviceId}><Button variant="outline-primary"><CalendarIcon size={16} /> Schedule...</Button></Link></Col>
                        <Col><Link to="/"><Button variant="outline-primary"><HistoryIcon size={16} /> Loop interval</Button></Link></Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
}

function mapStateToProps(state) {
    const { users, authentication, devices } = state;
    const { user } = authentication;
    return {
        devices,
        user,
        users
    };
}

const connectedManageRelayPage = connect(mapStateToProps)(ManageRelayPage);
export { connectedManageRelayPage as ManageRelayPage };