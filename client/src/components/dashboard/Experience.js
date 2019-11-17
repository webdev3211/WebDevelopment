import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

    onDeleteClick(id) {
        this.props.deleteExperience(id);
    }

    render() {

        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.fromDate}</Moment> -
          {exp.toDate === null || exp.toDate.length === 0 ? (
                        ' Now'
                    ) : (
                            <Moment format="YYYY/MM/DD">{exp.toDate}</Moment>
                        )}
                </td>
                <td> <button style={{ color: 'red' }}
                    onClick={this.onDeleteClick.bind(this, exp._id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                </td>

            </tr>
        ))

        if (this.props.experience.length === 0) {
            return (
                <div>
                    {/* No experience details */}
                </div>
            )
        } else {

            return (
                <div style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px'
                }} >
                    <h4 className="mb-4">Experience Details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Title</th>
                                <th>Years</th>
                                <th></th>
                            </tr>
                            {experience}
                        </thead>
                    </table>
                    <hr />
                </div>
            )
        }
    }


}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);