// import React, { Component } from 'react';
// import { AppRegistry, Image, View, Button, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
// import NfcOption from './components/NfcOption'
// import FBLoginButton from './components/FBLoginButton'
// import FBShareButton from './components/FBShareButton'
// import CameraApp from './components/Camera'
// import NfcPhoto from './components/NfcPhoto'

// export default class App extends Component { 
//   render() {
//     return (
//       // <NfcOption/>
//       // <View>
//       // <FBLoginButton/>
//       // <FBShareButton/>
//       // <CameraApp/>
//       // </View>
//       <NfcPhoto/>
//     );
//   }
// }

import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import PhotoBoot from './src/screens/PhotoBoot'

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Photo: {screen: PhotoBoot},
  Profile: { screen: ProfileScreen },
});

export default App;