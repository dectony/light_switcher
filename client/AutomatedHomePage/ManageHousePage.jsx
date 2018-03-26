import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-accessible-modal'
import { Link } from 'react-router-dom'
import { getDeviceComponentByType } from '../DeviceComponents'

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

//import './node_modules/react-accessible-accordion/dist/react-accessible-accordion.css';

import { roomsActions, devicesActions } from '../_actions';

class ManageHousePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            modalIsOpen: false,
            modalAltIsOpen: false
        };
        //this.props.dispatch(houseActions.getHouse(this.props.match.params.houseId));
        this.props.dispatch(roomsActions.getRooms(this.props.match.params.houseId));
        this.props.dispatch(devicesActions.getDevices(this.props.match.params.houseId));
    }

    getDeviceComponent(device) {
        let MultipleDeviceComponent = getDeviceComponentByType(device.deviceType);

        return <MultipleDeviceComponent device = {device} onUpdate = {(deviceId) => this.updateDeviceInfo(deviceId)} />
    }

    updateDeviceInfo(deviceId) {
        this.props.dispatch(devicesActions.getDevice(deviceId));
    }

    render() {
        const { rooms } = this.props;
        return(<div>
                <div className="col-md-6 col-md-offset-3">
                    <h1>Manage my house page</h1>
                    <h2>Here you can see all devices in the house</h2>
                    { rooms.items && rooms.items.length > 0 &&
                    <Accordion>
                            {rooms.items.map((room, index) =>
                                <AccordionItem key={room._id}>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">{room.title}
                                            <div class="accordion__arrow" role="presentation"></div>
                                        </h3>
                                    </AccordionItemTitle>
                                    <AccordionItemBody>
                                        {room.devices &&
                                            room.devices.map((device, index) =>
                                                <div key={device.deviceId}>
                                                    {this.getDeviceComponent(device)}
                                                </div>
                                            )}
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
    const { rooms, authentication } = state;
    const { user } = authentication;
    return {
        user,
        rooms
    };
}

const connectedManageHousePage = connect(mapStateToProps)(ManageHousePage);
export { connectedManageHousePage as ManageHousePage };