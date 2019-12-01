import axios from "axios";

import {
    CREATE_COURSE,
    GET_ERRORS,
    GET_COURSES,
    GET_COURSE
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

// GEt all courses
export const getCurrentCourse = (id) => dispatch => {
    // dispatch(clearErrors());
    console.log('Hello world: ', id);

    axios
        .get(`/admin/course/${id}`)
        .then(res =>
            dispatch({
                type: GET_COURSE,
                payload: res.data
            }),
    )
        .catch(err =>
            dispatch({
                type: GET_COURSE,
                payload: null
            })
            // console.log(err)
        );
};


// Edit Course
export const editthiscourse = (id, courseData, history) => dispatch => {
    axios
        .put(`/admin/updateCourse/${id}`, courseData)
        .then(res => history.push("/courses"))
        .catch(err =>
            // dispatch({
            //     type: GET_ERRORS,
            //     payload: err.response.data
            // })
            console.log(err)
        );
};



//Delete course
export const deletethiscourse = (id, history) => dispatch => {

    if (window.confirm("Are you sure? This can not be undone")) {
        axios
            .delete(`/admin/deleteCourse/${id}`)
            .then(res =>

                dispatch({
                    type: GET_COURSES,
                    payload: res.data
                }),

            // history.push("/courses"),
        )
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    } else {
    }
};



