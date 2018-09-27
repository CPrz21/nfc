import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    Linking,
    TextInput,
    ScrollView,
    Modal
} from 'react-native';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

export default class HomeScreen extends Component{
    static navigationOptions = {
        title: 'Home',
    };
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <Button
                title="Registro">
                </Button>
                <Button
                title="PhotoBoot"
                onPress={() =>navigate('Photo', { name: 'Jane' })}
                />
            </View>
        );
    }
}