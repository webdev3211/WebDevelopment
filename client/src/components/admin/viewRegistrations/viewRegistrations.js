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
      errors: {}
    };


  }

  componentDidMount() {
    // if (this.props.admin.isAdminAuthenticated) {
    //     this.props.history.push('/');
    // }
    axios.get("/admin/registrations").then(res => {
      this.setState({ registrations: res.data });


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
          {ins.studentId.name}
        </td>
        <td>
          {ins.courseId.name}
        </td>
        <td>{ins.amount}</td>
        <td>{ins.institute}</td>
      </tr>
    ));

    return (
      <div>
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
