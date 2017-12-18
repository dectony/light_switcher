import React from 'react';
import { connect } from 'react-redux';
import { House } from './house'
import  NewHouse  from './_newHouse'


import { houseActions } from '../_actions';

class MyHousesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(houseActions.getUserHouses(this.props.user._id));
    }

    handleAddNewHouse(houseTitle) {
        this.props.dispatch(houseActions.addNewHouse(houseTitle));
    }

    render() {
        const { houses  } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>My Houses</h1>
                {houses.items &&
                    <ul>
                        {houses.items.map((house, index) =>
                            <li key={house._id}>
                                {house.title}
                                {
                                    house.deleting ? <em> - Deleting...</em>
                                        : house.deleteError ? <span className="text-danger"> - ERROR: {house.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteUser(house._id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <NewHouse onClick = {(houseTitle) => this.handleAddNewHouse(houseTitle)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { houses, authentication } = state;
    const { user } = authentication;
    return {
        user,
        houses
    };
}

const connectedCreateHomePage = connect(mapStateToProps)(MyHousesPage);
export { connectedCreateHomePage as MyHousesPage };