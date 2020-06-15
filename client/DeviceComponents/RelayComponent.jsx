import React from 'react'
import Toggle from 'react-toggle'
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class RelayComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleState: this.props.device.isEnabled
        };
        this.handleBaconChange = this.handleBaconChange.bind(this);
    }

    handleBaconChange(e) {
        this.props.onUpdate(this.props.device, !this.state.toggleState);
        this.setState({toggleState: !this.state.toggleState});
    }

    static get deviceTypes() { return ['RELAY'] }

    render() {
        const { device } = this.props;
        return(
            <Container>
                <Row>
                    <Col><Link to={'/device/manage/' + device._id }>Manage</Link></Col>
                    <Col>{device.title}</Col>
                    <Col>
                        <Toggle
                            defaultChecked={this.state.toggleState}
                            onChange={this.handleBaconChange} />
                    </Col>
                </Row>
                    
            </Container>
        )
    }
}