import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { logoutAdmin } from '../../actions/admin/authadminActions';

import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

    constructor(props) {
        super(props);



    }

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();

        this.props.logoutUser();
        this.props.logoutAdmin();
    }

    render() {
        const boxStyle = {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px',
            // backgroundColor: '#242729'
            backgroundColor: '#f1f1f1'
        }


        const { isAuthenticated, admin, user, isAdminAuthenticated } = this.props.auth;
        // const { isAdminAuthenticated } = this.props.admin;
        // console.log(this.props);

        // console.log(admin);





        const authLinks = (
            <ul className="navbar-nav ml-auto">



                <li className="nav-item">

                    <Link className="nav-link" to="/admin/dashboard" style={{ backgroundColor: '#f6f6f6', color: 'black', fontWeight: 'bold', marginRight: '13px', marginTop: '5px' }}>
                        Dashboard
</Link>
                </li>



                <li className="nav-item" style={{ marginTop: '6px' }}>



                    <Link to="/dashboard">

                        <img
                            className="rounded-circle"
                            src="https://image.ibb.co/b0m3QT/default-avatar.png"
                            alt={user.name}
                            style={{ width: '35px', marginRight: '8px' }}
                            title="Your image"
                        />





                    </Link>

                </li>
                <li className="nav-item">
                    <Link
                        to=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                        style={{ color: 'black', fontWeight: 'bold' }}
                    >

                        Logout
          </Link>
                </li>

            </ul>
        );



        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register" style={{ color: 'black', fontWeight: 'bold' }}>
                        Sign Up
          </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{ color: 'black', fontWeight: 'bold' }}>
                        Login
          </Link>
                </li>
            </ul>
        );

        const courseLink = (
            // <ul className="navbar-nav pull-right">
            <li className="nav-item ">
                <Link className="nav-link" to="/admin/courses" style={{ backgroundColor: '#f6f6f6', color: 'black', fontWeight: 'bold', marginRight: '13px', marginTop: '5px' }}>
                    Courses
      </Link>
            </li>


            // </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark mb-4 sticky-top" style={boxStyle}>


                <Link className="navbar-brand" style={{ fontFamily: 'Satisfy', border: 'none', color: 'black', fontWeight: 'bold' }} to="/">
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





                        {(isAdminAuthenticated) ? courseLink : null}
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
