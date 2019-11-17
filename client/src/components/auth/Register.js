import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
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
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,

        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="register ">
                <div className="container card">
                    <div className="row card-body">
                        <div className="col-md-8 m-auto">
                            <h1 className="card-header display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your Virtual classroom account
              </p>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    name="name"
                                    placeholder="Enter Name"
                                    value={this.state.name}
                                    error={errors.name}
                                    onChange={this.onChange}
                                />



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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
