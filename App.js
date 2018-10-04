import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Photo from './src/screens/Photo'
import CheckNfc from './src/screens/CheckNfc'


export default class App extends Component{
    render(){
      StatusBar.setBackgroundColor('#001F45', true);
      
      const RootStack = createStackNavigator({
          Home: { screen: CheckNfc },
          Photo: {screen: Photo}
      });

        return(
            <RootStack/>
        );
    }
}

