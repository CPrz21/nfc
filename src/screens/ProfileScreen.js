import React from 'react';
import {Button} from 'react-native';
import CameraApp from '../components/Camera'
export default class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Toma la foto',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <CameraApp/>
      );
    }
  }