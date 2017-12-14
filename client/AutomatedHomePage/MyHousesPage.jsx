import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { houseActions } from '../_actions';

class MyHousesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(houseActions.getUserHouses(this.props.user._id));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
         const { title } = this.state;
         const { dispatch } = this.props;
         if (title) {
             dispatch(homeActions.login(username, password));
         }
    }

    render() {
        const { creating  } = this.props;
        const { home, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add new home!</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !home.title ? ' has-error' : '')}>
                        <label htmlFor="title">Home title</label>
                        <input type="text" className="form-control" name="title" value={home.title} onChange={this.handleChange} />
                        {submitted && !home.title &&
                            <div className="help-block">Home title is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Create</button>
                        {creating &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { houses, authentication } = state;
    const { user } = authentication;
    return {
        user,
        houses
    };
}

const connectedCreateHomePage = connect(mapStateToProps)(MyHousesPage);
export { connectedCreateHomePage as MyHousesPage };