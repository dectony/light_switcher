import React from 'react'
import Toggle from 'react-toggle'

export default class RelayComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            baconIsReady: false
        };
        this.handleBaconChange = this.handleBaconChange.bind(this);
    }

    handleBaconChange(e) {
        this.setState({baconIsReady: !this.state.baconIsReady});
    }

    static get deviceTypes() { return ['one'] }

    render() {
        const { device } = this.props;
        return(
            <div>
                <label>This is relay</label>
                <span>{device.title + this.state.baconIsReady}</span>
                    <Toggle
                        defaultChecked={this.state.baconIsReady}
                        onChange={this.handleBaconChange} />
            </div>
        )
    }
}