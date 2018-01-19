import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-accessible-modal'
import { Link } from 'react-router-dom'

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

//import './node_modules/react-accessible-accordion/dist/react-accessible-accordion.css';

import { houseActions } from '../_actions';

class ManageHousePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            modalIsOpen: false,
            modalAltIsOpen: false
        };
        this.props.dispatch(houseActions.getHouse(this.props.match.params.houseId));
    }

    render() {
        const { modalIsOpen, modalAltIsOpen, devices } = this.state;
        const { editHouse  } = this.props;
        return(<div>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Manage my house page</h1>
                    { editHouse.item && editHouse.item.rooms.length > 0 &&
                    <Accordion>
                            {editHouse.item.rooms.map((room, index) =>
                                <AccordionItem key={room._id}>
                                    <AccordionItemTitle><h3 className="u-position-relative">{room.title}<div class="accordion__arrow" role="presentation"></div></h3></AccordionItemTitle>
                                    <AccordionItemBody>
                                        <Link to={'/device/add/' + room._id }>New device...</Link>
                                    </AccordionItemBody>
                                </AccordionItem>
                            )}
                    </Accordion>
                    }
                </div>
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

const connectedManageHousePage = connect(mapStateToProps)(ManageHousePage);
export { connectedManageHousePage as ManageHousePage };