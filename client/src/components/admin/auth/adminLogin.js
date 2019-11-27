import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginAdmin } from '../../../actions/admin/authadminActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class adminLogin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.admin.isAdminAuthenticated) {
            this.props.history.push('/admin/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.admin.isAdminAuthenticated) {
            this.props.history.push('/admin/dashboard');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginAdmin(userData);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        // console.log(this.props);

        return (
            <div className="login">
                <div className="container card">
                    <div className="row card-body">
                        <div className="col-md-8 m-auto">
                            <h1 className="card-header display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your Admin account
              </p>
                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    name="email"
                                    placeholder="Email Address"
                                    type="email"
                                    value={this.state.email}
                                    error={errors.email}
                                    onChange={this.onChange}
                                />



                                <TextFieldGroup
                                    name="password"
                                    placeholder="Enter Password"
                                    type="password"
                                    value={this.state.password}
                                    error={errors.password}
                                    onChange={this.onChange}
                                />

                                <input type="submit" className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

adminLogin.propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors
});

export default connect(mapStateToProps, { loginAdmin })(adminLogin);
