import React from 'react';
import {Button,View,Text} from 'react-native';
import CameraApp from '../components/Camera'
import FBLoginButton from '../components/FBLoginButton'
export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Perfil',
    };
    render() {
      const { navigate } = this.props.navigation;
      const { navigation } = this.props;
      const tagId = navigation.getParam('tagId','sin tagId')
      return (
        // <CameraApp/>
        <View>
          <Text>{tagId}</Text>
        </View>
      );
    }
  }