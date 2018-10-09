import React, {Component} from 'react';
import {Modal, Text, Image, TouchableHighlight, ScrollView, View, Alert,StatusBar, StyleSheet} from 'react-native';
import ErrorIcon from '../assets/img/error_message.png'
import OkIcon from '../assets/img/ok_message.png'
import OkFB from '../assets/img/thumbs_up.png'

export default class ModalMessage extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  show() {
    this.setState({
      modalVisible: true,
    })
  }
  hide() {
    this.setState({
      modalVisible: false,
    })
  }
  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onShow={()=>{
              StatusBar.setBackgroundColor(this.props.bgColor, true);
              setTimeout(()=>{
                  StatusBar.setBackgroundColor('#001F45', true);
                  this.setModalVisible(!this.state.modalVisible);
              },1500);
          }}
          onRequestClose={() => {
              StatusBar.setBackgroundColor('#001F45', true);
              this.setModalVisible(!this.state.modalVisible);
          }}>
              <View style={[styles.modalContainer,{backgroundColor:this.props.bgColor}]}>
                  <View style={styles.modalContent}>
                      <Image
                      source={this.props.icon}
                      />

                      <TouchableHighlight
                          onPress={() => {
                              // StatusBar.setBackgroundColor(this.state.MessageBg, true);
                              this.setModalVisible(!this.state.modalVisible);
                          }}>
                          <Text style={styles.modalText}>{this.props.message}</Text>
                      </TouchableHighlight>
                  </View>
              </View>
          </Modal>
      </View>
    );
  }
}
 //STYLES
 var styles = StyleSheet.create({
  mainContainer:{
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  content:{
      justifyContent:"center",
      alignItems:"center"
  },
  message:{
      marginTop: 20,
      marginBottom:20,
      textAlign:'center',
      fontFamily:"MuliRegular",
      fontSize:16
  },
  modalContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalContent:{
      justifyContent:"center",
      alignItems:"center"
  },
  modalText:{
      fontFamily:"MuliBold",
      color:"white",
      textAlign:"center",
      marginTop:20
      
  },
  nfcImg:{
      height:250,
      width:250
  }
});