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
import AppLogo from '../assets/img/evet_logo.png';


export default class HomeScreen extends Component{

    static navigationOptions = {
        title: 'Home',
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button
                title="Registro"
                onPress={() =>navigate('Registry', { name: 'Jane' })}
                />
                <Button
                title="PhotoBoot"
                onPress={() =>navigate('Photo', { name: 'Jane' })}
                />
                {/* <Button
                title="ProfileScreen"
                onPress={() =>navigate('ProfileScreen', { name: 'Carlos' })}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor:'red'
    //   color: 'blue',
    //   fontWeight: 'bold',
    //   fontSize: 30,
    },
    red: {
      color: 'red',
    },
});