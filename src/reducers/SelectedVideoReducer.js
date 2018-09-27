import {
    SELECTED_VIDEO
} from '../actions/types';

const INITIAL_VIDEO = {}

export default (state=INITIAL_VIDEO, action) => {
    switch(action.type) {
        case SELECTED_VIDEO:
            return action.payload;

        default:
            return state;
    }
}