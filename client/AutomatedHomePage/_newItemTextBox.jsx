import React from 'react'

export default class NewItemTextBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemValue: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
            itemValue: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { itemValue } = this.state;
        const { onClick } = this.props;
        if (itemValue) {
            onClick(itemValue);
        }
    }


    render() {
        const { itemValue, submitted } = this.state;
        return(
            <form name="form">
                <div className={'form-group' + (submitted && !itemValue ? ' has-error' : '')}>
                    <div class="col-lg-6">
                        <div class="input-group">
                            <input type="text" class="form-control" name="itemValue" value={itemValue} onChange={this.handleChange} placeholder="Enter value here..." />
                            <span class="input-group-btn">
                                <button class="btn btn-default" onClick={this.handleSubmit} type="button">Add</button>
                            </span>
                        </div>
                        {submitted && !itemValue &&
                        <div className="help-block">Value is required</div>
                        }
                    </div>
                </div>
            </form>
        )
    }
}