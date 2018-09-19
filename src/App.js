import React from 'react';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Login from './screens/Login';
import VideoList from './screens/VideoList';
import Upload from './screens/Upload';
import VideoWatch from './screens/VideoWatch';

export default class App extends React.Component {

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyCx5DHq9cEEG9O3B2uPuREEpTmUjA-KYTk',
			authDomain: 'video-tube-e7c55.firebaseapp.com',
			databaseURL: 'https://video-tube-e7c55.firebaseio.com',
			projectId: 'video-tube-e7c55',
			storageBucket: 'video-tube-e7c55.appspot.com',
			messagingSenderId: '159057113312'
		});
	}

	render() {
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<RootNavigator />
			</Provider>
		);
	}
}

const RootNavigator = createSwitchNavigator({
	Login: { screen: Login },
	main: createBottomTabNavigator({
		Videos: createStackNavigator({
		VideoList: { screen: VideoList },
		VideoWatch: { screen: VideoWatch }
		}, {
				navigationOptions: {
				tabBarVisible: false,
				header: null,
			}
		}),
		Upload: { screen: Upload }
	}, {
		backBehavior: "initialRoute"
	}),
}, {
		navigationOptions: {
		tabBarVisible: false,
		lazy: true
	}
});