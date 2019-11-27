import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { logoutAdmin } from '../../actions/admin/authadminActions';

import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();

        this.props.logoutUser();
        this.props.logoutAdmin();
    }

    render() {
        const boxStyle = {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px',
            backgroundColor: '#242729'
        }


        const { isAuthenticated, user, isAdminAuthenticated } = this.props.auth;
        // const { isAdminAuthenticated } = this.props.admin;
        // console.log(this.props);

        const authLinks = (
            <ul className="navbar-nav ml-auto">







                <li className="nav-item" style={{ marginTop: '6px' }}>



                    <Link to="/dashboard">
                        <img
                            className="rounded-circle"
                            src="https://image.ibb.co/b0m3QT/default-avatar.png"
                            alt={user.name}
                            style={{ width: '25px', marginRight: '8px' }}
                            title="Your image"
                        />{' '}
                    </Link>

                </li>
                <li className="nav-item">
                    <Link
                        to=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >

                        Logout
          </Link>
                </li>

            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
          </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
          </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark mb-4 sticky-top" style={boxStyle}>


                <Link className="navbar-brand" style={{ fontFamily: 'Satisfy' }} to="/">
                    StepUp Analytics
          </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {/* <Link className="nav-link" to="/profiles">
                                {' '}
                                Profile
                </Link> */}
                        </li>
                    </ul>
                    {(isAuthenticated || isAdminAuthenticated) ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile, logoutAdmin })(Navbar);
