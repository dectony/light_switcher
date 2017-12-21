import React from 'react'

export default class NewHouse extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            houseTitle: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
            houseTitle: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { houseTitle } = this.state;
        const { onClick } = this.props;
        if (houseTitle) {
            onClick(houseTitle);
        }
    }


    render() {
        const { houseTitle, submitted } = this.state;
        return(
            <form name="form">
                <div className={'form-group' + (submitted && !houseTitle ? ' has-error' : '')}>
                    <div class="col-lg-6">
                        <div class="input-group">
                            <input type="text" class="form-control" name="houseTitle" value={houseTitle} onChange={this.handleChange} placeholder="Type house title here..." />
                            <span class="input-group-btn">
                                <button class="btn btn-default" onClick={this.handleSubmit} type="button">Go!</button>
                            </span>
                        </div>
                        {submitted && !houseTitle &&
                        <div className="help-block">house title is required</div>
                        }
                    </div>
                </div>
            </form>
        )
    }
}