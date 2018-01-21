import React from 'react'

export default class ClimateSensorComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    static get deviceTypes() { return ['three'] }

    render() {
        const { device } = this.props;
        return(
            <div>
                <label>This is climate sensor</label>
                <span>{device.title}</span>
                <label>Temperature:</label>
                <label>Humidity:</label>
            </div>
        )
    }
}
