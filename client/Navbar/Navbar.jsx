import React from 'react';
import { Link } from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu';

import '../css/burgerNavBarStyles.css';

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

    showSettings (event) {
        event.preventDefault();
    }

    render() {
        return (
            <Menu>
                <Link to="/"><i class="fas fa-home"></i><span>Home Page</span></Link>
                <Link to="/houses"><i class="fas fa-laptop-house"></i><span>My Houses</span></Link>
                <Link to="/users"><i class="fas fa-users-cog"></i><span>Users</span></Link>
                <Link to="/houses"><i class="fa fa-fw fa-star-o"></i><span>Test</span></Link>
            </Menu>
        )
    }
}