import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import "./index.css";
import { NavBarList } from "./NavBarList";

class NavBar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        window.location.reload();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <React.Fragment>
                <div className="navbar-fixed">
                    <nav className="z-depth-0">
                        <div className="nav-wrapper">
                            <Link to="/" className="brand-logo center">
                                <b>Marketplace</b>
                            </Link>
                            <div
                                data-target="mobile-demo"
                                className="sidenav-trigger"
                            >
                                <i className="material-icons">menu</i>
                            </div>
                        </div>
                    </nav>
                </div>
                <ul className="sidenav" id="mobile-demo">
                    <NavBarList user={user} onClick={this.onLogoutClick} />
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavBar);
