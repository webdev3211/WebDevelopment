import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import {
    GET_ERRORS,

    SET_CURRENT_ADMIN
} from "../types";

// Register User
export const registerAdmin = (userData, history) => dispatch => {
    axios
        .post("/admin/register", userData)
        .then(res => history.push("/admin/login"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginAdmin = userData => dispatch => {
    axios
        .post("/admin/login", userData)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem("adminjwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentAdmin(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentAdmin = decoded => {
    return {
        type: SET_CURRENT_ADMIN,
        payload: decoded
    };
};

// Log user out
export const logoutAdmin = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("adminjwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentAdmin({}));
};
