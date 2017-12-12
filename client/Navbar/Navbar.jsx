import React from 'react';
import { Link } from 'react-router-dom';

export default class MyNavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <ul role="nav">
                    <li><Link to="/homes">Homes</Link></li>
                    <li><Link to="/repos">Repos</Link></li>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        )
    }
}