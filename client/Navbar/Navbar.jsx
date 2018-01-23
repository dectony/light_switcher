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
                <a id="home" className="menu-item">
                    <Link to="/"><span className="glyphicon glyphicon glyphicon-user"></span><label className="menuLabel">Home Page</label></Link>
                </a>
                <a id="home" className="menu-item">
                    <Link to="/houses"><span className="glyphicon glyphicon glyphicon-home"></span><label className="menuLabel">My Houses</label></Link>
                </a>
                <a id="home" className="menu-item">
                    <Link to="/houses"><span className="glyphicon glyphicon glyphicon-remove"></span><label className="menuLabel">Admin</label></Link>
                </a>
                <a id="home" className="menu-item">
                    <Link to="/houses"><span className="glyphicon glyphicon glyphicon-remove"></span><label className="menuLabel">Test</label></Link>
                </a>
            </Menu>
        )
    }
}