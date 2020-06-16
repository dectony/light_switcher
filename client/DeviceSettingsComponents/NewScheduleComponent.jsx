import Modal from 'react-bootstrap/Modal';
import { Button, Jumbotron } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function NewScheduleComponent(props) {
    const [value, setValue] = useState('');
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <Container>
              <Row>
                <Form.Control  placeholder="Test" value={value} onChange={(e)=>setValue(e.target.value)}/>
              </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={() => props.onSubmit(value)}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default NewScheduleComponent;

export const Test = () =>{ return (<h1>Test</h1>)};