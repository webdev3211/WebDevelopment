import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";
import { Link } from "react-router-dom";

class campusAmbassador extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // regLink: '',
            // file: '',
            courses: [],
            errors: {}
        };


    }

    componentDidMount() {
        // if (this.props.admin.isAdminAuthenticated) {
        //     this.props.history.push('/');
        // }
        axios.get("/admin/courses").then(res => {
            this.setState({ courses: res.data });


        });

        // console.log(this.state.institutes);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    addMaterialToIt(courseId) {
        this.props.history.push(`/admin/addMaterial/${courseId}`);

    }

    render() {

        const simplestyle = {
            padding: '5px 10px',
            marginRight: 'auto',
            border: '0.5px solid #f0f0f0',
            borderLeft: '50px solid #3B5998',
            marginLeft: '15px',
            marginBottom: '20px'
        }



        const boxStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            padding: "10px"
        };

        let courseContent;

        if (this.state.courses.length > 0) {
            // courseContent =
            return (

                <div>
                    <h1 className="text-center" style={{ marginTop: "-50px", marginBottom: '30px' }}>
                        Select Course to add Material to
        </h1>


                    <hr />





                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="list-group-item">
                                    {this.state.courses.map(course => (


                                        <li style={simplestyle} key={course._id} >

                                            <h1 style={{ cursor: 'pointer' }} onClick={this.addMaterialToIt.bind(this, course._id)}
                                            > {course.name}</h1>

                                        </li>



                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );

        } else {
            return (

                <div className="container">
                    <div className="row">
                        <div className="col-md-12" style={boxStyle}>
                            <h3 style={{ fontFamily: 'Montserrat' }} className="text-center">No courses</h3>
                        </div>
                    </div>
                </div>
            )
        }


    }
}

campusAmbassador.propTypes = {
    admin: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin,
    errors: state.errors
});

export default connect(mapStateToProps, {})(withRouter(campusAmbassador));
