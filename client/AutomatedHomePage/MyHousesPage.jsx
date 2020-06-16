import React from 'react';
import { connect } from 'react-redux';
import { House } from './'
import NewItemTextBox from './_newItemTextBox'
import { Link } from 'react-router-dom'

import { houseActions } from '../_actions';
import { Row, Col, Container, ListGroup, Button } from 'react-bootstrap';

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
        const { houses } = this.props;
        return (
            <Container>
                <Row>
                    <h1>My Houses</h1>
                </Row>
                <Row>
                    <h2>Here you can add/remove houses</h2>
                </Row>
                <ListGroup>
                    {
                        houses.items && houses.items.map((house, index) =>
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col sm={10}>
                                        <Link to={'/house/manage/' + house._id}>{house.title}</Link>
                                    </Col>
                                    <Col sm={2}>
                                        {
                                            house.deleting ? <em> - Deleting...</em>
                                                : house.deleteError
                                                    ? <span className="text-danger"> - ERROR: {house.deleteError}</span>
                                                    : <Button onClick={this.handleDelete(house._id)} variant="outline-danger"><i class="far fa-trash-alt"></i> Delete</Button>
                                        }
                                        <Link to={'/edit/house/' + house._id}>
                                            <Button variant="outline-info"><i class="far fa-edit"></i> Edit</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                </ListGroup>
                <Link to={'/house/add'}><Button variant="outline-info"><i class="fas fa-plus"></i> New house...</Button></Link>
            </Container>
            // <div >
            //     <h1>My Houses</h1>
            //     <h2>Here you can add/remove houses</h2>
            //     {houses.items &&
            //         <ul class="list-group">
            //             {houses.items.map((house, index) =>
            //                 <li class="list-group-item list-group-item-info" key={house._id}>
            //                     <Link to={'/house/manage/' + house._id }>{house.title}</Link>
            //                     {
            //                         house.deleting ? <em> - Deleting...</em>
            //                             : house.deleteError
            //                             ? <span className="text-danger"> - ERROR: {house.deleteError}</span>
            //                             : <button type="button"
            //                                       class="btn btn-default"
            //                                       onClick={this.handleDelete(house._id)}>
            //                                 <span class="glyphicon glyphicon-trash"></span>
            //                             </button>
            //                     }
            //                         <Link to={'/edit/house/' + house._id }>
            //                             <button type="button"
            //                                     class="btn btn-default">
            //                                 <span class="glyphicon glyphicon-pencil"></span>
            //                             </button>
            //                         </Link>
            //                 </li>
            //             )}
            //         </ul>
            //     }
            //     <Link to={'/house/add'}>New house...</Link>
            //     {/*<NewItemTextBox onClick = {(houseTitle) => this.handleAddNewHouse(houseTitle)}/>*/}
            // </div>
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