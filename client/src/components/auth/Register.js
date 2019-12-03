import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import SelectListGroup from "../common/SelectListGroup";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      institute: "",
      role: "",
      options: ["Enter Institute"],
      class: "",
      options1: ["Enter Class"],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    axios
      .get("/admin/institutes")
      .then(ins => {
        this.setState({ options: ins.data });
        // console.log(this.state.options.selected);
      })
      .catch(err => console.log(err));

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentDidUpdate() {
    axios
      .get(`/admin/institute/${this.state.institute}`)
      .then(ins => {
        this.setState({ options1: ins.data });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    // if (e.target.name === 'institute') {

    //   var index = document.getElementsByName("institute")[0].options.selectedIndex;
    //   // console.log(index);

    //   var institutename = document.getElementsByName("institute")[0].options[index].text.trim().toString();

    //   // this.setState({
    //   //   institute: institutename
    //   // })

    //   // console.log(this.state.institute);

    // }
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      institute: this.state.institute,
      class: this.state.class,
      role: this.state.role
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { options } = this.state;

    const { options1 } = this.state;

    const classoption = options1.map(cls => (
      <option key={cls} value={cls}>
        {cls}
      </option>
    ));
    // console.log(options);

    // const options2 = [
    //   { label: '* Select Professional Status', value: 0 },
    // { label: 'Developer', value: 'Developer' },
    // { label: 'Junior Developer', value: 'Junior Developer' },
    // { label: 'Senior Developer', value: 'Senior Developer' },
    // { label: 'Manager', value: 'Manager' },
    // { label: 'Student or Learning', value: 'Student or Learning' },
    // { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    // { label: 'Intern', value: 'Intern' },
    // { label: 'Other', value: 'Other' }
    // ];

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

                <select
                  className={classnames("form-control form-control-lg")}
                  style={{ marginBottom: 20 }}
                  name="class"
                  value={this.state.class}
                  onChange={this.onChange}
                >
                  {classoption}
                </select>

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
