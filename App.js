import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    StatusBar
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import Photo from './src/screens/Photo'
import Registry from './src/screens/Registry'


export default class App extends Component{
    render(){
      StatusBar.setBackgroundColor('#001F45', true);
      
      const RootStack = createStackNavigator({
          Home: { screen: Registry },
          Photo: {screen: Photo},
          Registry: { screen: Registry },
          ProfileScreen: {screen: ProfileScreen}
      });

        return(
            <RootStack/>
        );
    }
}

