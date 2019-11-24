import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Moment from 'react-moment';
import { deleteProject } from '../../actions/profileActions';

class Project extends Component {

    onDeleteClick(id) {
        this.props.deleteProject(id);
    }

    render() {

        const projects = this.props.projects.map(pro => (
            <tr key={pro._id}>
                <td>{pro.title}</td>
                <td>{pro.desc}</td>
                <td>{pro.url}</td>
                <td> <button style={{ color: 'red' }}
                    onClick={this.onDeleteClick.bind(this, pro._id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                </td>
            </tr>
        ))

        if (this.props.projects.length === 0) {
            return (
                <div>
                    {/* No project details */}
                </div>
            )
        } else {

            return (
                <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px' }}>
                    <h4 className="mb-4">Project Details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Url</th>
                                <th></th>
                            </tr>
                            {projects}
                        </thead>
                    </table>
                    <hr />
                </div>
            )
        }
    }


}

Project.propTypes = {
    deleteProject: PropTypes.func.isRequired
}

export default connect(null, { deleteProject })(Project);