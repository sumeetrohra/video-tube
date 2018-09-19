import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Expo from 'expo';
import firebase from 'firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import { userID } from '../actions';

class Login extends Component {

    async componentWillMount() {
        let google_token = await AsyncStorage.getItem('google_token');

        if (google_token) {
            this.props.navigation.navigate('Videos');
            if (this._mounted){
                this.setState({ google_token });
            }
        }
        else {
            if (this._mounted){
                this.setState({ google_token });
            }
        }
    }

    //these two lifecycle methods are used to make sure that our setState method works, because setState only works when component is mounted
    componentDidMount () {
        this._mounted = true
    }
    componentWillUnmount () {
        this._mounted = false
    }

    //stores google_token temporarily
    state = {
        google_token: null,
    }

    //gets google token and sends this token to firebase for auth
    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: "159057113312-8j7ag8v45duaohmul8dvk5rjb1tiif29.apps.googleusercontent.com",
                scopes: ['profile', 'email']
            });

            if (result.type === 'success') {
                let credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential)
                .then((user) => {
                    this.setState({google_token: user.user});
                    this.onAuthComplete();
                })
                .catch((err) => console.log(err));
            } else {
                console.log('error');
            }
        } catch(e) {
            console.log(e);
        }
    }

    //storing user object in AsyncStorage, storing uid in redux andnavigating
    onAuthComplete = async () => {
        try {
            await AsyncStorage.setItem('google_token', JSON.stringify(this.state.google_token));
            //to get item use JSON.parse()
            this.props.userID(this.state.google_token.uid);
        }
        catch (err) {
            console.log(err);
        }
        //don't know why i need this if  but the first navigate returns true and only then the second one works...
        if (this.props.navigation.navigate('Videos')) {
            this.props.navigation.navigate('videos');
        }
    }

    render() {
        if (_.isNull(this.state.google_token)) {
            return <AppLoading size="large" />;
        }
        return (
            <View style={styles.viewStyle}>
                <Button
                    title='Login with Google'
                    onPress={() => this.signInWithGoogleAsync()}
                />
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default connect(null, {
    userID
})(Login);