import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import SelectListGroup from "../common/SelectListGroup";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      institute: "",
      role: "",
      options: [],
      class: "",
      options1: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    console.log("heelo");
    axios.get("/institute/register").then(ins => {
      this.setState({ options: ins.data });
    });

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (this.state.institute) {
      axios.get(`/institute/register/${this.state.institute}`).then(ins => {
        this.setState({ options1: ins.data });
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      institute: this.state.institute,
      role: this.state.role
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { options } = this.state;
    const { options1 } = this.state;

    return (
      <div className="register" style={{ marginBottom: "100px " }}>
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

                <SelectListGroup
                  name="institute"
                  placeholder="Enter institute"
                  value={this.state.institute}
                  error={errors.institute}
                  onChange={this.onChange}
                  options={options}
                />

                <SelectListGroup
                  name="class"
                  placeholder="Enter class"
                  value={this.state.class}
                  error={errors.institute}
                  onChange={this.onChange}
                  options={options1}
                />
                <TextFieldGroup
                  name="role"
                  placeholder="Enter role"
                  value={this.state.role}
                  error={errors.role}
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
