import {
    USER_ID_FETCHED
} from '../actions/types';

const INITIAL_STATE = {};

export default (state=INITIAL_STATE, action) => {
    console.log(action);
    switch(action.type) {
        case USER_ID_FETCHED:
            return { ...state, uid: action.payload };

        default:
            return state;
    }
}