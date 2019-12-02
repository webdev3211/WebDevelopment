import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { withRouter } from 'react-router-dom';
import Moment from "react-moment";
import axios from "axios";
import { deleteExperience } from "../../actions/profileActions";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: []
    };
  }
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }
  componentDidMount() {
    axios
      .get(`course/${this.props.course}`)
      .then(res => this.setState({ courses: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const course = this.state.courses.map(cos => (
      <tr key={cos._id}>
        <td>{cos.name}</td>
        <td>{cos.startDate}</td>
        <td>{cos.venue}</td>
        {/* <td>
                    <Moment format="YYYY/MM/DD">{exp.fromDate}</Moment> -
          {exp.toDate === null || exp.toDate.length === 0 ? (
                        ' Now'
                    ) : (
                            <Moment format="YYYY/MM/DD">{exp.toDate}</Moment>
                        )}
                </td> */}
        {/* <td> <button style={{ color: 'red' }}
                    onClick={this.onDeleteClick.bind(this, exp._id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button> */}
        {/* </td> */}
      </tr>
    ));

    if (this.props.course.length === 0) {
      return <div>{/* No experience details */}</div>;
    } else {
      return (
        <div
          style={{
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            padding: "10px"
          }}
        >
          <h4 className="mb-4"> Courses Enrolled</h4>
          <table className="table">
            <thead>
              <tr>
                <th>name</th>
                <th>starts</th>
                <th>venue</th>
                <th></th>
              </tr>
              {course}
            </thead>
          </table>
          <hr />
        </div>
      );
    }
  }
}

Courses.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Courses);
// export default Courses;
