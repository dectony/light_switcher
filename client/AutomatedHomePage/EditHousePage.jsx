import React from 'react';
import { connect } from 'react-redux';
import { houseActions } from '../_actions'


class EditHousePage extends React.Component {

    componentWillMount() {
        this.props.dispatch(houseActions.getHouse(this.props.match.params.houseId));
    }


    render() {
        const {editHouse} = this.props;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h1>Edit {editHouse.item && editHouse.item.title}</h1>
                {editHouse.item &&
                <div>
                    {editHouse.item.title}
                    {editHouse.item.description}
                </div>
                }
                {editHouse.item.rooms.length > 0 &&
                <ul class="list-group">
                    {editHouse.item.rooms.map((room, index) =>
                        <li class="list-group-item list-group-item-info" key={room._id}>
                            {room.title}
                        </li>
                    )}
                </ul>
                }
                <NewItemTextBox onClick = {(houseTitle) => this.handleAddNewHouse(houseTitle)}/>
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