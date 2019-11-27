import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { registerUser } from '../../actions/authActions';
// import TextFieldGroup from '../common/TextFieldGroup';


class createCourse extends Component {
    render() {
        return (
            <div>

                <h1 className="text-center" style={{ marginTop: '-50px' }}>
                    Create a New Course
                    <p style={{ fontSize: '30px' }}>
                        <small>Host a new workshop</small>

                    </p>
                </h1>

            </div>
        )
    }
}



createCourse.propTypes = {
    // createCourse: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {})(withRouter(createCourse));