import {
    USER_ID_FETCHED
} from './types';

export const userID = (uid) => {
    return {
        type: USER_ID_FETCHED,
        payload: uid
    };
}