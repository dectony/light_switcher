import React from 'react';
import { Link } from 'react-router-dom';

import { slide as Menu } from 'react-burger-menu'

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
            <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
                <a id="home" className="menu-item"><Link to="/houses">MyHouses</Link></a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </Menu>
        )
    }
}