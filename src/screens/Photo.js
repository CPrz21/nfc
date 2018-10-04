import React, {Component} from 'react';
import {View, Text, Button} from 'react-native'
import PhotoBooth from '../components/Camera'

export default class Photo extends Component {
    static navigationOptions = {
        title: 'Toma la foto',
        headerTitleStyle: {alignSelf: 'center'},
        headerTintColor: 'white',
        headerStyle: {
        backgroundColor: '#001F45',
        textAlign: 'center'
        },
        headerTitleStyle: {
          width: '70%',
          textAlign: 'center',
        }
      };
    render(){
        const { navigate } = this.props.navigation;
        const { navigation } = this.props;
        const userInfo = navigation.getParam('userInfo','Sin Información')
        return(
            <View style={{flex: 1,
                alignItems: 'center'}}>
                <PhotoBooth/>
                <Text>
                   {JSON.stringify(userInfo)}
                </Text>
            </View>
        )
    }
}