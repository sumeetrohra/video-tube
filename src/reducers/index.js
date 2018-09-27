import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import VideoListReducer from './VideoListReducer';
import SelectedVideoReducer from './SelectedVideoReducer';

export default combineReducers({
    auth: AuthReducer,
    videos: VideoListReducer,
    selectedVideo: SelectedVideoReducer
});