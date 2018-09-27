import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListItem from '../components/ListItem';
import {
    videoListFetch
} from '../actions';

class VideoList extends Component {

    componentWillMount() {
        this.props.videoListFetch();
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

    render() {
        console.log(this.props);
        return (
            <View>
                <Text style={{ fontSize: 30 }}>
                    Video List Screen
                </Text>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const videos = _.map(state.videos, (val, uid) => {
        return { ...val, uid };
    });
    return { videos };
}

export default connect(mapStateToProps, {
    videoListFetch
})(VideoList);