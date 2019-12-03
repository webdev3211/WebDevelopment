import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

class campusAmbassador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // regLink: '',
      // file: '',
      registrations: [],
      name: "",
      course: "course",
      errors: {}
    };
    this.student = this.student.bind(this);
  }

  componentDidMount() {
    // if (this.props.admin.isAdminAuthenticated) {
    //     this.props.history.push('/');
    // }
    axios.get("/admin/registrations").then(res => {
      this.setState({ registrations: res.data });
      // axios.get(`profile/user/${res.studentId}`)
      // .then(res=>{
      //     this.setState({name:res.handle})
      // });
      // console.log(ins);
      // for (var i = 0; i < ins.data.length; i++) {
      //     this.institutes.push(ins.data[i]);
      // }
      if (this.state.institutes) {
        axios.get("/");
      }
    });

    // console.log(this.state.institutes);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  student(id) {
    let student = "";
    axios
      .get(`profile/user/${id}`)
      .then(res => (student = student + res.data.handle))
      .catch(err => console.log(err));
    return student;
  }
  course(id) {
    let course = "";
    axios
      .get(`admin/course/${id}`)
      .then(res => (course = course + res.data.name))
      .catch(err => console.log(err));
    return course;
  }
  onEditInstituteCampusAmbassador(instituteId) {
    // axios.put('/admin/addCampusAmbassador/${id}', (req, res) => {

    // })
    // console.log(id);

    this.props.history.push(`/admin/editCampusAmbassador/${instituteId}`);
  }

  onDeleteCampusAmbassador(id) {
    if (window.confirm("Are you sure? This can not be undone")) {
      axios
        .put(`/admin/removeCampusAmbassador/${id}`, "")
        .then(res => this.props.history.push("/admin/campusAmbassador"))
        .catch(err => console.log(err));
    } else {
      console.log("Delete ambasador operation cancelled");
    }
  }

  render() {
    const boxStyle = {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      padding: "10px",
      // backgroundColor: '#242729'
      // backgroundColor: '#f1f1f1',
      marginBottom: "150px"
    };

    const { errors } = this.state;
    const { registrations } = this.state;
    const { name } = this.state;

    // console.log(institutes);

    const viewRegistrations = registrations.map(ins => (
      <tr key={ins._id}>
        <td style={{ fontSize: "20px", fontFamily: "Montserrat" }}>
          {this.student(ins.studentId)}
          {/* {ins.studentId} */}
        </td>
        <td>{this.course(ins.courseId)}</td>
        <td>{ins.amount}</td>
        <td>{ins.institute}</td>
      </tr>
    ));

    return (
      <div>
        {/* <img
          src="https://i.ibb.co/b2pvZ8R/Cmps-Ambassdr-Mob.png"
          style={{
            height: "60%",
            width: "60%",
            marginBottom: "80px",
            marginLeft: "300px"
          }}
        /> */}

        <h1 className="text-center" style={{ marginTop: "-50px" }}>
          All Registrations
        </h1>

        <br />

        <div className="container" style={boxStyle}>
          <table className="table">
            <thead>
              <tr style={{ fontSize: "20px", fontFamily: "Montserrat" }}>
                <th>Student Name</th>
                <th>course</th>
                <th>amount</th>
                <th>institute</th>
                <th>payment ID</th>
              </tr>
              {viewRegistrations}
            </thead>
          </table>
          <hr />
        </div>
      </div>
    );
  }
}

campusAmbassador.propTypes = {
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  errors: state.errors
});

export default connect(mapStateToProps, {})(withRouter(campusAmbassador));
