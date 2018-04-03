import React from 'react'
import Toggle from 'react-toggle'

export default class RelayComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleState: this.props.device.isEnabled
        };
        this.handleBaconChange = this.handleBaconChange.bind(this);
    }

    handleBaconChange(e) {
        this.props.onUpdate(this.props.device, !this.state.toggleState);
        this.setState({toggleState: !this.state.toggleState});
    }

    static get deviceTypes() { return ['RELAY'] }

    render() {
        const { device } = this.props;
        return(
            <div>
                <label>This is relay</label>
                <span>{device.title} </span>
                    <Toggle
                        defaultChecked={this.state.toggleState}
                        onChange={this.handleBaconChange} />
            </div>
        )
    }
}