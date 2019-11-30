import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Axios from "axios";

class CourseItem extends Component {
  //Register student on clicking enroll button
  onClick(courseId) {
    console.log(this.history);
    // Axios.put(`/course/enroll/${courseId}`)
    //   .then(this.props.history.push("/"))
    //   .catch(err => console.log(err));
  }

  render() {
    const boxStyle = {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      padding: "10px",
      // backgroundColor: '#242729'
      // backgroundColor: '#f1f1f1',
      marginBottom: "40px"
    };

    const { course, admin } = this.props;

    return (
      <div className="card card-body" style={boxStyle}>
        <div className="row">
          <div className="col-md-4">
            <Link to="/">
              <img
                className="d-none d-md-block"
                src={course.file}
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
            </Link>
          </div>
          <div className="col-md-8">
            <h3 className="text-center" style={{ fontFamily: "Montserrat" }}>
              {course.name}
            </h3>
            <br />
            <p className="lead">{course.desc}</p>
            <br />

            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <b>Venue: </b> {course.venue}
                  <br />
                  <b>Fee: </b> ₹ {course.fee}
                  <br />
                  <b>Starting Date: </b>{" "}
                  <Moment format="DD/MM/YYYY">{course.startDate}</Moment>
                  <br />
                  <b>Ending Date: </b>{" "}
                  <Moment format="DD/MM/YYYY">{course.endDate}</Moment>
                  <br />
                  <b>Registration last Date: </b>{" "}
                  <Moment format="DD/MM/YYYY">{course.regLastDate}</Moment>
                  <br />
                </div>

                <div className="col-md-4">
                  <button
                    onClick={this.onClick.bind(this, course._id)}
                    className="btn"
                    style={{ backgroundColor: "tomato", color: "white" }}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, {})(CourseItem);
