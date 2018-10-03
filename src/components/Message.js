import React, {Component} from 'react';
import {Modal, Text, Image, TouchableHighlight, ScrollView, View, Alert,StatusBar} from 'react-native';
import ErrorIcon from '../assets/img/error_message.png'
import OkIcon from '../assets/img/ok_message.png'

export default class ModalExample extends Component {
  state = {
    modalVisible: this.props.modalVisible,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onShow={()=>{
            StatusBar.setBackgroundColor('#30B716', true);
          }}
          onRequestClose={() => {
            StatusBar.setBackgroundColor('#001F45', true);
            this.setModalVisible(!this.state.modalVisible);
            // Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center', backgroundColor: '#30B716'}}>
            <View style={{justifyContent:"center", alignItems:"center"}}>
              <Image
              source={OkIcon}
              />

              <TouchableHighlight
                onPress={() => {
                    StatusBar.setBackgroundColor('#001F45', true);
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show {JSON.stringify(this.state.modalVisible)}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}