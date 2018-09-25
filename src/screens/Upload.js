import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { DocumentPicker } from 'expo';
import firebase from 'firebase';
import ModalActivityIndicator from 'react-native-modal-activityindicator'

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
                <ModalActivityIndicator
                    visible={this.state.loading}
                    size='large'
                    color='white' 
                />
            </View>
        );
    }
}


export default Upload;