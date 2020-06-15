import React from 'react';
import { connect } from 'react-redux';
import  NewItemTextBox  from './_newItemTextBox'
import { houseActions, roomsActions } from '../_actions'


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
            <div >
                <h1>Edit {editHouse.item && editHouse.item.title}</h1>
                <h2>Here you can add rooms to the house</h2>
                {editHouse.item &&
                <div>
                    {editHouse.item.title}
                    {editHouse.item.description}
                </div>
                }
                {editHouse.item && editHouse.item.rooms && editHouse.item.rooms.length > 0 &&
                <ul class="list-group">
                    {editHouse.item.rooms.map((room, index) =>
                        <li class="list-group-item list-group-item-info" key={room._id}>
                            {room.title}
                        </li>
                    )}
                </ul>
                }
                <NewItemTextBox onClick = {(roomTitle) => this.handleAddNewRoom(roomTitle)}/>
            </div>
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