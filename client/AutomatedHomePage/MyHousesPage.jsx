import React from 'react';
import { connect } from 'react-redux';
import { House } from './house'
import  NewItemTextBox  from './_newItemTextBox'
import { Link } from 'react-router-dom'


import { houseActions } from '../_actions';

class MyHousesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(houseActions.getUserHouses(this.props.user._id));
    }

    handleAddNewHouse(houseTitle) {
        var newHouse = {
            title: houseTitle,
            description: 'House of ' + this.props.user.firstName,
            owner: this.props.user
        };
        this.props.dispatch(houseActions.addNewHouse(newHouse));
    }

    handleDelete(houseId) {
        return (e) => this.props.dispatch(houseActions.delete(houseId));
    }

    handleManage(houseId) {
        return (e) => this.props.dispatch(houseActions.delete(houseId));
    }

    render() {
        const { houses  } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>My Houses</h1>
                {houses.items &&
                    <ul class="list-group">
                        {houses.items.map((house, index) =>
                            <li class="list-group-item list-group-item-info" key={house._id}>
                                {house.title}
                                {
                                    house.deleting ? <em> - Deleting...</em>
                                        : house.deleteError ? <span className="text-danger"> - ERROR: {house.deleteError}</span>
                                        : <button type="button"  class="btn btn-default" onClick={this.handleDelete(house._id)}>
                                            <span class="glyphicon glyphicon-trash"></span>
                                        </button>
                                }
                                <span><Link to={'/edit/house/' + house._id }><span class="glyphicon glyphicon-pencil"></span></Link></span>
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
    const { houses, authentication } = state;
    const { user } = authentication;
    return {
        user,
        houses
    };
}

const connectedCreateHomePage = connect(mapStateToProps)(MyHousesPage);
export { connectedCreateHomePage as MyHousesPage };