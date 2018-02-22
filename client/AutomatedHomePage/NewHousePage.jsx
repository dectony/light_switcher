import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { houseActions } from '../_actions';


class NewHousePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            brokerId: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const house = {
            title: this.state.title,
            brokerId: this.state.brokerId,
            description: 'House of ' + this.props.user.firstName,
            owner: this.props.user
        };
        const { dispatch } = this.props;
        dispatch(houseActions.addNewHouse(house));
    }

    render() {
        const { title, brokerId, submitted } = this.state;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h1>House Info</h1>
                <div className={'form-group' + (submitted && !title ? ' has-error' : '')}>
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={this.handleChange} />
                    {submitted && !title &&
                    <div className="help-block">Title is required</div>
                    }
                </div>
                <div className={'form-group' + (submitted && !brokerId ? ' has-error' : '')}>
                    <label htmlFor="brokerId">brokerId</label>
                    <input type="text" className="form-control" name="brokerId" value={brokerId} onChange={this.handleChange} />
                    {submitted && !brokerId &&
                    <div className="help-block">broker Id is required</div>
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

const connectedNewHousePage = connect(mapStateToProps)(NewHousePage);
export { connectedNewHousePage as NewHousePage };