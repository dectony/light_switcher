import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { devicesActions } from '../_actions';

//import Select from 'react-select';
import { Select } from 'semantic-ui-react'

class NewDevicePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            type: '',
            deviceId: '',
            selectedOption: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    handleTypeChange(selectedOption)  {
        this.setState({ selectedOption });
    };

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const device = {
            title: this.state.title,
            type: this.state.selectedOption.value,
            deviceId: this.state.deviceId,
            roomId: this.props.match.params.roomId
        };
        const { dispatch } = this.props;
        dispatch(devicesActions.addDevice(device));
    }

    render() {
        const { title, deviceId, submitted } = this.state;
        const { selectedOption } = this.state;
        const type = selectedOption && selectedOption.value;
        return(
            <div >
                <h1>New Device</h1>
                <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={this.handleChange} />
                    {submitted && !title &&
                    <div className="help-block">Title is required</div>
                    }
                </div>
                <Select placeholder='Select your country' options={[
                        { value: 'RELAY', label: 'LightSwitcher' },
                        { value: 'two', label: 'IP Cam' },
                        { value: 'CLIMATE_SENSOR', label: 'Climate sensor' },
                    ]} />
                {/* <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="deviceTypes"
                    value={type}
                    onChange={this.handleTypeChange}
                    options={[
                        { value: 'RELAY', label: 'LightSwitcher' },
                        { value: 'two', label: 'IP Cam' },
                        { value: 'CLIMATE_SENSOR', label: 'Climate sensor' },
                    ]}
                /> */}
                <div className={'form-group' + (submitted && !deviceId ? ' has-error' : '')}>
                    <label htmlFor="deviceId">deviceId</label>
                    <input type="text" className="form-control" name="deviceId" value={deviceId} onChange={this.handleChange} />
                    {submitted && !deviceId &&
                    <div className="help-block">deviceId is required</div>
                    }
                </div>
                <div className="form-group">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Add</button>
                    <Link to="/house/manage" className="btn btn-link">Cancel</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedNewDevicePage = connect(mapStateToProps)(NewDevicePage);
export { connectedNewDevicePage as NewDevicePage };