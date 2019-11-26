import isEmpty from '../validation/is-empty';

import {
    SET_CURRENT_USER,
    SET_CURRENT_ADMIN
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    isAdminAuthenticated: false,
    admin: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case SET_CURRENT_ADMIN:
            return {
                ...state,
                isAdminAuthenticated: !isEmpty(action.payload),
                admin: action.payload
            };
        default:
            return state;
    }
}
