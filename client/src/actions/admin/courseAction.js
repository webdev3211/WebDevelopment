import axios from "axios";

import {
    CREATE_COURSE,
    GET_ERRORS,
    GET_COURSES
} from "../types";




// Post new course
export const createnewcourse = (newCourse, history) => dispatch => {
    axios
        .post("/admin/addCourse", newCourse)
        .then(res =>
            dispatch({
                type: CREATE_COURSE,
                payload: res.data
            }),
            history.push("/admin/courses")
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        );
};


// GEt all courses
export const getCourses = () => dispatch => {
    // dispatch(clearErrors());
    axios
        .get('/admin/courses')
        .then(res =>
            dispatch({
                type: GET_COURSES,
                payload: res.data
            }),
    )
        .catch(err =>
            // dispatch({
            //     type: GET_COURSES,
            //     payload: null
            // })
            console.log(err)
        );
};
