import React from 'react'

export default class IpCamComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static get deviceTypes() { return ['two'] }

    render() {
        const { device } = this.props;
        return(
            <div>
                <label>This is Ip Cam</label>
                <span>{device.title}</span>
            </div>
        )
    }
}
