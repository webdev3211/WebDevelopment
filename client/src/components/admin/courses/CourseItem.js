import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

import { deletethiscourse } from "../../../actions/admin/courseAction";

class CourseItem extends Component {
  //Register student on clicking enroll button

  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      colour: "tomato"
    };
  }
  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  onClick(courseId) {
    axios
      .put(`/course/enroll/${courseId}`)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch(err => console.log(err));
  }

  viewMaterial(courseId) {}

  addMaterial(courseId) {}

  viewRegistrations(courseId) {}

  onDeleteClick(courseId) {
    this.props.deletethiscourse(courseId, this.props.history);
  }

  onUpdateClick(courseId) {
    this.props.history.push(`/admin/editCourse/${courseId}`);
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
          <div
            onMouseEnter={this.handleMouseHover}
            onMouseLeave={this.handleMouseHover}
          >
            <Link to="/">
              <img
                className=""
                src={course.file}
                style={{ width: "100%", height: "100px" }}
                alt=""
              />
              <span className="pull-right">
                <h3
                  className="text-center"
                  style={{ fontFamily: "Montserrat", color: "black" }}
                >
                  {course.name}
                </h3>
                <br />
              </span>
            </Link>

            <div>
              {/* <h3 className="text-center" style={{ fontFamily: "Montserrat" }}>
                  {course.name}
                </h3>
                <br /> */}

              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <p className="lead">{course.desc}</p>
                    <br />
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
                      style={{
                        marginBottom: "10px",
                        backgroundColor: this.state.colour,
                        color: "white"
                      }}
                    >
                      Enroll
                    </button>

                    <button
                      onClick={this.addMaterial.bind(this, course._id)}
                      className="btn"
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "#9B870C",
                        color: "white"
                      }}
                    >
                      Add Material
                    </button>

                    <button
                      onClick={this.viewRegistrations.bind(this, course._id)}
                      className="btn"
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "green",
                        color: "white"
                      }}
                    >
                      Registrations
                    </button>

                    <button
                      onClick={this.viewMaterial.bind(this, course._id)}
                      className="btn"
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "white",
                        color: "red"
                      }}
                    >
                      View Material
                    </button>

                    <span>
                      <button
                        className="pull-left"
                        style={{ color: "green" }}
                        onClick={this.onUpdateClick.bind(this, course._id)}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </button>

                      <button
                        className="pull-right"
                        style={{ marginLeft: "30px", color: "red" }}
                        onClick={this.onDeleteClick.bind(this, course._id)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </span>
                  </div>
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
  deletethiscourse: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(mapStateToProps, { deletethiscourse })(
  withRouter(CourseItem)
);
