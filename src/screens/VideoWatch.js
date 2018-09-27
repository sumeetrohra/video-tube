import React, { Component } from 'react';
import { Dimensions, View, ListView, Text } from 'react-native';
import Expo, { Video } from 'expo';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListItem from '../components/ListItem';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class VideoWatch extends Component {

    static naigationOptions = {
        tabBarVisible: false,
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ videos }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(videos);
    }

    renderRow(video) {
        return <ListItem video={video} />;
    }

    renderVideo() {
        const width = Dimensions.get('window').width;
        const height = (width*3)/4;
        if(this.props.selectedVideo) {
            return (
                <Video
                    source={{ uri: this.props.selectedVideo.url }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={Expo.Video.RESIZE_MODE_CONTAIN}
                    shouldPlay
                    useNativeControls
                    style={{ width, height }}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderVideo()}
                <CardSection>
                    <Text style={{ fontSize: 20, padding: 10 }}>
                        {this.props.selectedVideo.name}
                    </Text>
                </CardSection>
                <Card>
                    <CardSection>
                        <Text style={{fontSize: 18, padding: 5}}>
                            Other Videos:
                        </Text>
                    </CardSection>
                    <CardSection>
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSource}
                            renderRow={this.renderRow}
                        />
                    </CardSection>
                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const videos = _.map(state.videos, (val, uid) => {
        return { ...val, uid };
    });
    const { selectedVideo } = state;
    const otherVideos = videos.filter(obj => {
        return obj.uid !== selectedVideo.uid;
    });
    return { selectedVideo, videos: otherVideos };
}

export default connect(mapStateToProps, {})(VideoWatch);