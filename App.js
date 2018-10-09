import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Photo from './src/screens/Photo'
import CheckNfc from './src/screens/CheckNfc'
import Camera from './src/components/Camera'
// import SplashScreen from 'react-native-splash-screen'


export default class App extends Component{
    componentDidMount() {
        // SplashScreen.hide();
    }
    render(){
      StatusBar.setBackgroundColor('#001F45', true);
      
      const RootStack = createStackNavigator({
          Home: { screen: Camera },
          Photo: {screen: Photo}
      });

        return(
            <RootStack/>
        );
    }
}

