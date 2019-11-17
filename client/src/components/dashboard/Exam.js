import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Moment from 'react-moment';
import { deleteExam } from '../../actions/profileActions';

class Exam extends Component {

    onDeleteClick(id) {
        this.props.deleteExam(id);
    }

    render() {

        const exams = this.props.exams.map(ex => (
            <tr key={ex._id}>
                <td>{ex.name}</td>
                <td>{ex.score}</td>
                <td>{ex.url}</td>
                <td> <button style={{ color: 'red' }}
                    onClick={this.onDeleteClick.bind(this, ex._id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                </td>

            </tr>
        ))

        if (this.props.exams.length === 0) {
            return (
                <div>
                    {/* No exam details */}
                </div>
            )
        } else {

            return (
                <div style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px'
                }} >
                    <h4 className="mb-4">Exam Details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Url</th>
                                <th></th>
                            </tr>
                            {exams}
                        </thead>
                    </table>
                    <hr />
                </div>
            )
        }
    }


}

Exam.propTypes = {
    deleteExam: PropTypes.func.isRequired
}

export default connect(null, { deleteExam })(Exam);