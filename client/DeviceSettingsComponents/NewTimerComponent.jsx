import Modal from 'react-bootstrap/Modal';
import { Button, Jumbotron } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import TimePicker from 'rc-time-picker';

const format = 'h:mm a';

const now = moment().hour(0).minute(0);

function onChange(value) {
    console.log(value && value.format(format));
}


function NewTimerComponent(props) {
    const [value, setValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [isEnabled, setIsEnabled] = useState('off');
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new timer
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Enter time and action</h4>
                <Container>
                    <Row>
                        <Form.Control placeholder="Test" value={value} onChange={(e) => setValue(e.target.value)} />
                    </Row>
                    <Row>
                        <Col>
                            <TimePicker
                                showSecond={false}
                                defaultValue={now}
                                className="xxx"
                                onChange={(value) => setTimeValue(value)}
                                format={format}
                                use12Hours
                                inputReadOnly
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type="switch"
                                id="timerAction"
                                checked = {isEnabled}
                                onChange = {() => setIsEnabled(!isEnabled)}
                                label="Choose what should be done"
                            />
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={() => props.onSubmit({timeValue: timeValue.format("YYYY-MM-DD HH:mm:ss"), isEnabled: isEnabled})}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewTimerComponent;