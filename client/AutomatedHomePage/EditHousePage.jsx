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
                <h1>Edit</h1>
                {editHouse.item &&
                <div>
                    {editHouse.item.title}
                    {editHouse.item.description}
                </div>
                }
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