import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerAdmin } from '../../../actions/admin/authadminActions';
import TextFieldGroup from '../../common/TextFieldGroup';

class adminRegister extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            phoneNo: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.admin.isAdminAuthenticated) {
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

        const newAdmin = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phoneNo: this.state.phoneNo

        };

        this.props.registerAdmin(newAdmin, this.props.history);
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
            <div className="register" style={{ marginBottom: '100px ' }}>
                <div className="container card" style={boxStyle}>
                    <div className="row card-body">
                        <div className="col-md-10 m-auto">
                            <h1 className="card-header display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your Admin Account
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

                                <TextFieldGroup
                                    name="phoneNo"
                                    placeholder="Enter phoneNo"
                                    value={this.state.phoneNo}
                                    error={errors.phoneNo}
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

adminRegister.propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors
});

export default connect(mapStateToProps, { registerAdmin })(withRouter(adminRegister));
