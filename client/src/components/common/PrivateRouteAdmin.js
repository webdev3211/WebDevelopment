import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRouteAdmin = ({ component: Component, admin, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            admin.isAdminAuthenticated === true ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/admin/login" />
                )
        }
    />
);

PrivateRouteAdmin.propTypes = {
    admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
