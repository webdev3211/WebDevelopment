import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

    onDeleteClick(id) {
        this.props.deleteEducation(id);
    }

    render() {

        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.institution}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.fromDate}</Moment> -
          {edu.toDate === null || edu.toDate.length === 0 ? (
                        ' Now'
                    ) : (
                            <Moment format="YYYY/MM/DD">{edu.toDate}</Moment>
                        )}
                </td>
                <td> <button style={{ color: 'red' }}
                    onClick={this.onDeleteClick.bind(this, edu._id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                </td>

            </tr>
        ))

        if (this.props.education.length === 0) {
            return (
                <div>
                    {/* No education details */}
                </div>
            )
        } else {

            return (
                <div style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px'
                }}>
                    <h4 className="mb-4">Education Details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Institution</th>
                                <th>Degree</th>
                                <th>Years</th>
                                <th></th>
                            </tr>
                            {education}
                        </thead>
                    </table>
                    <hr />
                </div>
            )
        }
    }


}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);