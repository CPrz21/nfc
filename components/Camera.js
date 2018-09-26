import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { ShareDialog } from 'react-native-fbsdk';
const FBSDK = require('react-native-fbsdk');
const {ShareApi} = FBSDK;

export default class App extends Component {
    // state = {
    //     avatarSource: null,
    //     videoSource: null
    // };

    constructor(props) {
        super(props);
        

        this.state = {
            avatarSource: null,
            videoSource: null
        };
    }
  

  selectPhotoTapped() {
      var tmp=this;
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });

        //----
            // const sharePhotoContent = {
            // contentType = 'photo',
            // photos: [{ imageUrl: source }],
            // }

            // ShareDialog.show(tmp.state.sharePhotoContent);
            
            // ShareDialog.show(sharePhotoContent).then((canShow) => {
            
            // if (canShow) return ShareDialog.show(sharePhotoContent);
            
            //  }
            
            // ).then((result) => {
            
            //  if (result.isCancelled) {
            
            //   alert('Share cancelled');
            
            //  } else {
            
            //    alert('Share success with postId: ' + result.postId);
            
            //    }
            
            //   },
            
            //   function(error) {
            
            //   alert('Share fail with error: ' + error);
            //       }
            //     );

        //---
      }
    });
  }
  

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }


  
  sharePic(){
    const pick =this.state.avatarSource.uri;
    const sharePhotoContent = {
      contentType : 'photo',
      photos: [{ imageUrl: pick }]
      }
      //console.log(this.state.avatarSource);
  
      ShareDialog.show(sharePhotoContent);
    }

    shareLinkWithShareDialog() {
      const pick =this.state.avatarSource.uri;
      let shareLinkContent = {
            contentType : 'photo',
            photos: [{ imageUrl: pick }],
            contentDescription: 'BT7 sharing is easy!'
            }
      
       ShareDialog.canShow(shareLinkContent).then((canShow) => {
      
      if (canShow) return ShareDialog.show(shareLinkContent);
      
       }
      
      ).then((result) => {
      
       if (result.isCancelled) {
      
        alert('Share cancelled');
      
       } else {
      
         alert('Share success with postId: ' + result.postId);
      
         }
      
        },
      
        function(error) {
      
        alert('Share fail with error: ' + error);
            }
          );
     }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
        <Button onPress={() => this.sharePic()} title="press me"></Button>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 20,
    width: 150,
    height: 150
  }
});