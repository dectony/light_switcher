import React from 'react';

class House extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var house = this.props;
        return(
            <div>
                {house.title}
                <Button >Edit</Button>
                <Button >Delete</Button>
            </div>
        )
    }
}