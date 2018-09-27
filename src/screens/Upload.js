import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { DocumentPicker } from 'expo';
import firebase from 'firebase';
import ModalActivityIndicator from 'react-native-modal-activityindicator';
import { connect } from 'react-redux';
import _ from 'lodash';

import { videoListFetch } from '../actions';
import ListItem from '../components/ListItem';
import Card from '../components/Card';
import CardSection from '../components/CardSection';

class Upload extends Component {

    state = {
        uploadButtonDisable: true,
        result: null,
        loading: false,
        name: null,
        url: null
    }

    initialState = () => {
        this.setState({
            uploadButtonDisable: true,
            result: null,
            loading: false,
            name: null,
            url: null
        });
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

    //document picker used for getting video uri
    pickVideo = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        this.setState({ result: result, uploadButtonDisable: false });
        console.log(this.state.result);
        //console.log(firebase.auth().currentUser);
        //this.uploadVideo(result);
    }

    //video upload
    uploadVideo = async () => {
        const result = this.state.result;
        if (result && this.state.name) {
            //fetching the video blob
            this.setState({ loading: true });
            const response = await fetch(this.state.result.uri);
            const blob = await response.blob();

            //uploading the video
            var ref = firebase.storage().ref().child(result.name);
            ref.put(blob)
            .then((res) => {

                //download url
                firebase.storage().ref(this.state.result.name).getDownloadURL()
                .then(url => {
                    this.setState({ url: url });

                    //database commit function
                    const { currentUser } = firebase.auth();
                    firebase.database().ref('/videos')
                    .push({ name: this.state.name, url: this.state.url, userID: currentUser.uid })
                    .then(() => this.setState({ loading: false }))
                    .catch((err) => console.log(err));

                    this.videoListFetch();
                    this.initialState();
                })
                .catch(err => console.log(err));
            })
            .catch(() => this.setState({ loading: false }));
        }
        else {
            console.log("file or name corrupt");
            this.setState({ loading: false });
        }
    }

    render() {
        console.log(this.props.videos);
        return (
            <View style={{ flex: 1 }} >
                <Button
                    title="Select video"
                    buttonStyle={{
                        borderRadius: 10,
                        marginTop: 30
                    }}
                    onPress={this.pickVideo}
                />
                <FormLabel>Enter Name</FormLabel>
                <FormInput
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <Button
                    title="upload"
                    buttonStyle={{
                        borderRadius: 10,
                        marginTop: 30
                    }}
                    disabled={this.state.uploadButtonDisable}
                    onPress={this.uploadVideo}
                />
                <Card>
                    <CardSection>
                        <Text style={{fontSize: 18, padding: 5}}>
                        Uploads:
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
                <ModalActivityIndicator
                    visible={this.state.loading}
                    size='large'
                    color='white' 
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { currentUser } = firebase.auth();
    const videos = _.map(state.videos, (val, uid) => {
        return { ...val, uid };
    });
    const userVideos = videos.filter(obj => {
        return obj.userID === currentUser.uid;
    });
    return { videos: userVideos };
}

export default connect(mapStateToProps, {})(Upload);