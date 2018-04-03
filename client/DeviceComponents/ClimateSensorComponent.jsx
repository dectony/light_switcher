import React from 'react'
import { connect } from 'react-redux';

class ClimateSensorComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            temperature: this.props.device.measures.Temperature,
            humidity: this.props.device.measures.Humidity
        };
        this.updateMeasures = this.updateMeasures.bind(this);
        //this.timer = setInterval(this.updateMeasures, 5000);
    }

    updateMeasures() {
        this.props.onUpdate(this.props.device.deviceId);
    }

    componentWillReceiveProps() {
        this.setState({
            temperature: this.props.device.measures.Temperature,
            humidity: this.props.device.measures.Humidity
        })
    }

     componentWillUnmount() {
         clearInterval(this.timer);
     }

    static get deviceTypes() { return ['CLIMATE_SENSOR'] }

    render() {
        const { devices } = this.props;
        const  device  = (devices.items && devices.items.length > 0)
            ? devices.items.find(t => (t.deviceId === this.props.device.deviceId))
            : this.props.device;
        return(
            <div>
                <label>This is climate sensor</label>
                <span>{device.title}</span>
                <div>
                    <label>Temperature: </label> {device.measures.Temperature}
                </div>
                <div>
                    <label>Humidity: </label> {device.measures.Humidity} %
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { devices } = state;
    return {
        devices
    };
}

const connectedClimateSensorComponent = connect(mapStateToProps)(ClimateSensorComponent);
export { connectedClimateSensorComponent as ClimateSensorComponent };
