import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Moment from 'react-moment';
import { deletePaper } from '../../actions/profileActions';

class Paper extends Component {

    onDeleteClick(id) {
        this.props.deletePaper(id);
    }

    render() {

        const papers = this.props.papers.map(ppr => (
            <tr key={ppr._id}>
                <td>{ppr.title}</td>
                <td>{ppr.issuer}</td>
                <td>{ppr.url}</td>
                <td> <button style={{ color: 'red' }}
                    onClick={this.onDeleteClick.bind(this, ppr._id)}
                >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                </td>

            </tr>
        ))

        if (this.props.papers.length === 0) {
            return (
                <div>
                    {/* No paper details */}
                </div>
            )
        } else {

            return (
                <div style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px'
                }}>
                    <h4 className="mb-4">Paper Details</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Issuer</th>
                                <th>Url</th>
                                <th></th>
                            </tr>
                            {papers}
                        </thead>
                    </table>
                    <hr />
                </div>
            )
        }
    }


}

Paper.propTypes = {
    deletePaper: PropTypes.func.isRequired
}

export default connect(null, { deletePaper })(Paper);