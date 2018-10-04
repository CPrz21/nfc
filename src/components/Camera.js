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

export default class App extends Component {
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
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View>

          <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
            <View style={[styles.avatarContainer,styles.avatar]}>
            { this.state.avatarSource === null ? <Text style={styles.PhotoTxt}>Seleccciona la foto</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            </View>
          </TouchableOpacity>
          {/* <Text>SRC {JSON.stringify(this.state.avatarSource)}</Text> */}
          <Button
          containerStyle={{ marginTop: 20 }}
          color="#001F45"
          title="Compartir Foto"
          onPress={()=>{
            console.log('hola');
          }}
          />
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
    borderColor: '#001F45',
    borderWidth: 5 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginTop:20
  },
  avatar: {
    borderRadius: 10,
    width: 300,
    height: 300,
  },
  PhotoTxt:{
    fontFamily:"MuliBold",
    marginTop:15,
    color:'#001F45'
  }
});