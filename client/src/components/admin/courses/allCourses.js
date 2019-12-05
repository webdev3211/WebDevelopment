import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import axios from 'axios';

// import { getCourses } from '../../../actions/admin/courseAction';
import CourseItem from './CourseItem';


class allCourses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: []
        }




    }



    componentDidMount() {
        axios
            .get('/admin/courses')
            .then(res =>

                this.setState({ courses: res.data })

            )
            .catch(err =>
                console.log(err)

            );
    }

    render() {

        const boxStyle = {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            padding: "10px"
        };

        let courseContent;

        if (this.state.courses.length > 0) {
            // courseContent =
            return (<div className="feed" style={{ marginBottom: '200px', marginTop: '-20px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 coursepanel">


                            {this.state.courses.map(course => (
                                <CourseItem key={course._id} course={course} />
                            ))}

                        </div>
                    </div>
                </div>
            </div>);

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



// allCourses.propTypes = {
// getCourses: PropTypes.func.isRequired,
//     courses: PropTypes.array.isRequired
// }


// const mapStateToProps = state => ({
//     courses: state.courses
// })

// export default connect(mapStateToProps, {})(allCourses);

export default allCourses;