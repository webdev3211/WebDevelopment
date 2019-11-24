import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Landing extends Component {




    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">
                                    Step Up Analytics
                                </h1>
                                <p className="lead" style={{ fontSize: '50px' }}>
                                    {' '}
                                    Virtual Classroom
                </p>
                                <hr />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth

})


export default connect(mapStateToProps, {})(Landing);
