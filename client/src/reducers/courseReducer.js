import {
    GET_COURSES

} from '../actions/types';


const initialState = {
    courses: [],
    // post: {},
    loading: false
};



export default function (state = initialState, action) {

    switch (action.type) {
        // case POST_LOADING:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
                // loading: false
            }
        case GET_COURSE:
            return {
                ...state,
                courses: action.payload,
                // loading: false
            }

        default:
            return state;

    }

}