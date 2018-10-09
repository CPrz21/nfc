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
const axios = require('axios');
import {aws} from '../keys/keys'
import {RNS3} from 'react-native-aws3'

export default class App extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            avatarSource: null,
            videoSource: null,
            load:false,
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
      console.log(response);
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
        const file = { 
          uri: response.uri,
          name: response.fileName,
          type: response.type
        };
        
        const options ={
          keyPrefix:'s3/',
          bucket:'bt7-photo-booth',
          region:'us-east-2',
          accessKey:aws.accessKeyID,
          secretKey:aws.secretAccessKey,
          successActionStatus:201
        }

        this.setState({
          load:true
        });

        RNS3.put(file, options).then(response => {
          if (response.status === 201){
            fetch('https://cpbuaenv59.execute-api.us-east-2.amazonaws.com/staging/users/posts',{
            method: "POST",
            body: JSON.stringify({"url":response.body.postResponse.location,"rfid":'04BDEC12524980'}),
            headers: {
            'Content-Type': 'application/json'
            },
            }).then(response=>{
              return response.json();
            })
            .then(res=>{
              console.log(res);
              var newFile = {
                uri:res.Location
              }
              this.setState({
                avatarSource: newFile,
                load:true
              });
            }).catch(error => console.error('Error:', error));
          }else{
            alert('Error al subir imagen');
          }

        });
      
     
      // formData.append('data', response)
      // axios.post(apiUrl, formData, {
      //   headers: {
      //     'Content-Type': response.type
      //   }
      // }).catch((error) => {
      //   console.log(error.response);
      // });

      }
    });
  }

  render() {
    return (
      <View>

          <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
            <View style={[styles.avatarContainer,styles.avatar]}>
            {/* { this.state.avatarSource === null ? <Text style={styles.PhotoTxt}>Seleccciona la foto</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            } */}
            { this.state.avatarSource === null ? <Text style={styles.PhotoTxt}>{this.state.load===false ? 'Seleccione la foto' : 'Cargando foto...'}</Text> :
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
            alert('imagen compartida!')
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