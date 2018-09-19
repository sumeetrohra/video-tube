import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class VideoList extends Component {

    render() {
        return (
            <View>
                <Text style={{ fontSize: 30 }}>
                    Video List Screen
                </Text>
                <Button
                    onPress={() => this.props.navigation.navigate('VideoWatch')}
                    title="click here"
                />
            </View>
        );
    }
}

export default VideoList;