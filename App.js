import React, { Component } from 'react';
import { AppRegistry, Image, View, Button, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
// import NfcOption from './components/NfcOption'
import FBLoginButton from './components/FBLoginButton'
import FBShareButton from './components/FBShareButton'
import CameraApp from './components/Camera'

export default class App extends Component {
  // _fbAuth(){
  //   // LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result){
  //   //   if(result.isCancelled){
  //   //     console.log('login was cancelled');
        
  //   //   }else{
  //   //     console.log(result);
  //   //   }
  //   // },function(error){
  //   //   console.log('An error ocurred: '+ error);
  //   // })
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
  //     (result) => {
  //         if (result.isCancelled) {
  //             console.log('Login cancelled')
  //         } else {
  //             AccessToken.getCurrentAccessToken().then(
  //                 (data) => {
  //                     console.log(data);
  //                 }
  //             )
  //         }
  //     },
  //     (error) => {
  //         console.log('Login fail with error: ' + error)
  //     }
  // )
  // }

  
  render() {
    return (
      // <NfcOption/>
      <View>
      <FBLoginButton/>
      {/* <FBShareButton/> */}
      {/* <CameraApp/> */}
      </View>
    );
  }
}