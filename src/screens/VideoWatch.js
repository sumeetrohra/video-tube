import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import Expo, { Video } from 'expo';

class VideoWatch extends Component {

    static naigationOptions = {
        tabBarVisible: false,
        width: 480,
        height: 270
    }

    componentWillMount() {
        const width = Dimensions.get('window').width;
        const height = (width*9)/16;
        this.setState({ width, height });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Video
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/video-tube-e7c55.appspot.com/o/VID_29970813_232803_670.mp4?alt=media&token=0fcfc75c-d857-42ee-955a-890246930243' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={Expo.Video.RESIZE_MODE_CONTAIN}
                    shouldPlay
                    useNativeControls
                    style={{ width: this.state.width, height: this.state.height }}
                />
            </View>
        );
    }
}

export default VideoWatch;