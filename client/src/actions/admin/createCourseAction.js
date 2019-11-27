import axios from "axios";

import {
    CREATE_COURSE
} from "./types";

// Get current profile
export const createCourse = () => dispatch => {
    axios
        .get("/profile")
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payload: {}
            })
        );
};