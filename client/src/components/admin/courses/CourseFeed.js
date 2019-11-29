import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import CourseItem from './CourseItem';


class CourseFeed extends Component {
    render() {

        const { course } = this.props;
        // console.log(this.props);

        return course.map(course => <CourseItem key={course._id} course={course} />)

    }
}

CourseFeed.propTypes = {
    course: PropTypes.array.isRequired
}



export default CourseFeed;
