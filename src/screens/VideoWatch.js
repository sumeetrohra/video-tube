import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabBarBottom, NavigationActions } from 'react-navigation';

class VideoWatch extends Component {

    static naigationOptions = {
        tabBarVisible: false
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 30 }}>
                    Video Watch Screen
                </Text>
            </View>
        );
    }
}

export default VideoWatch;