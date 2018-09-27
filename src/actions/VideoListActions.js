import firebase from 'firebase';
import {
    VIDEO_LIST_FETCH_SUCCESS,
    SELECTED_VIDEO
} from './types';

export const videoListFetch = () => {

    return (dispatch) => {
        firebase.database().ref('/videos')
        .on('value', snapshot => {
            dispatch({
                type: VIDEO_LIST_FETCH_SUCCESS,
                payload: snapshot.val()
            });
        });
    };
};

export const selectVideo = (videoUrl) => {
    return {
        type: SELECTED_VIDEO,
        payload: videoUrl
    }
}