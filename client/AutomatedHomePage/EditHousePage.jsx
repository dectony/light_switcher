import React from 'react';
import { connect } from 'react-redux';
import  NewItemTextBox  from './_newItemTextBox'
import { houseActions, roomsActions } from '../_actions'

import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap';


class EditHousePage extends React.Component {

    componentWillMount() {
        this.props.dispatch(houseActions.getHouse(this.props.match.params.houseId));
        this.props.dispatch(roomsActions.getRooms(this.props.match.params.houseId));
    }

    handleAddNewRoom(roomTitle) {
        const newRoom = {
            title: roomTitle,
            house: this.props.editHouse.item._id,
        };

        this.props.dispatch(roomsActions.addRoom(newRoom));
    }


    render() {
        const {editHouse} = this.props;
        return(
            <Container>
                <Row>
                    <h1>Edit {editHouse.item && editHouse.item.title}</h1>
                </Row>
                <Row>
                    <h2>Here you can add rooms to the house</h2>
                </Row>
                <ListGroup>
                    {editHouse.item && editHouse.item.rooms && editHouse.item.rooms.length > 0 && editHouse.item.rooms.map((room) =>
                        <ListGroup.Item  key={room._id}>
                            {room.title}
                        </ListGroup.Item>
                    )}
                </ListGroup>
                <NewItemTextBox onClick = {(roomTitle) => this.handleAddNewRoom(roomTitle)}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    const { editHouse, authentication } = state;
    const { user } = authentication;
    return {
        user,
        editHouse
    };
}

const connectedEditHousePage = connect(mapStateToProps)(EditHousePage);
export { connectedEditHousePage as EditHousePage };