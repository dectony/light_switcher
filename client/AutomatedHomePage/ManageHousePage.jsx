import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-accessible-modal'

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

    openModal(item) {
        this.setState({
            [item]: true,
        });
    }


    closeModal(item) {
        this.setState({
            [item]: false,
        });
    }

    render() {
        const { modalIsOpen, modalAltIsOpen, devices } = this.state;
        const { editHouse  } = this.props;
        return(<div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => this.closeModal('modalIsOpen')}
                    className="modal--slideshow"
                    overlayClick
                >
                    <h2>Oh, hello!</h2>
                    <a href="http://example.com/">Link inside content</a>
                </Modal>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Manage my house page</h1>
                    { editHouse.item && editHouse.item.rooms.length > 0 &&
                    <Accordion>
                            {editHouse.item.rooms.map((room, index) =>
                                <AccordionItem key={room._id}>
                                    <AccordionItemTitle><h3 className="u-position-relative">{room.title}<div class="accordion__arrow" role="presentation"></div></h3></AccordionItemTitle>
                                    <AccordionItemBody>
                                        <button>
                                            New device...
                                        </button>
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