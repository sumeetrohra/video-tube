import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import CardSection from './CardSection';
import {
    selectVideo
} from '../actions';

class ListItem extends Component {
    render() {
        return(
            <TouchableOpacity
                onPress={() => {
                    this.props.selectVideo(this.props.video);
                    this.props.navigation.navigate('VideoWatch')
                }}
            >
                <View>
                    <CardSection style={{ flexDirection: 'column' }}>
                        <Text style={styles.textStyle}>
                            {this.props.video.name}
                        </Text>
                    </CardSection>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 18,
        paddingLeft: 15,
    }
}

export default connect(null, {
    selectVideo
})(withNavigation(ListItem));