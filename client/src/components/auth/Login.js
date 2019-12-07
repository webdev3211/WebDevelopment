import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
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
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
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

        this.props.loginUser(userData);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const boxStyle = {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px',
            // backgroundColor: '#242729'
            backgroundColor: 'white',
            padding: '20px',
            width: '35%'
        }
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container card" style={boxStyle}>
                    <div className="row card-body">
                        <div className="col-md-10 m-auto">
                            <h1 className="card-header display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your VirtualClassroom account
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
