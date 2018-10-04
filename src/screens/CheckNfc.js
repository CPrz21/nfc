import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    Linking,
    ScrollView,
    Modal,
    Image,
    StyleSheet,
    StatusBar
} from 'react-native';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import ScanLogo from '../assets/img/scan.png'
import OkIcon from '../assets/img/ok_message.png'
import ErrorIcon from '../assets/img/error_message.png'
import Load from '../assets/img/load.gif'

const ErrorColor='#E24942',
      OkColor='#30B716';

export default class Registro extends Component {
    static navigationOptions = {
      title: 'Registra tu NFC',
      headerTitleStyle: {alignSelf: 'center'},
      headerTintColor: 'white',
      headerStyle: {
      backgroundColor: '#001F45',
      textAlign: 'center'
      },
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
      }
    };

    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            tag: {},
            detected:false,
            modalVisible: false,
            MessageBg:null,
            MessageIcon:null,
            MessageTxt:null
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
    getId(){
        fetch('https://cpbuaenv59.execute-api.us-east-2.amazonaws.com/staging/users?rfid=046C0612524984')
                            .then(response => {
                            return response.json();
                            })
                            .then(data => {
                            console.log(data);
                            }).catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                }
            });
        
        NfcManager.registerTagEvent(this._onTagDiscovered);

    }

    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
    }


    _startNfc() {
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        }).then(result => {
            console.log('start OK', result);
        }).catch(error => {
            console.warn('start fail', error);
            this.setState({supported: false});
        })

        if (Platform.OS === 'android') {
            NfcManager.getLaunchTagEvent()
                .then(tag => {
                    console.log('launch tag', tag);
                    if (tag) {
                        this.setState({ tag,detected:true });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.isEnabled()
                .then(enabled => {
                    this.setState({ enabled });
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.onStateChanged(
                event => {
                    if (event.state === 'on') {
                        this.setState({enabled: true});
                    } else if (event.state === 'off') {
                        this.setState({enabled: false});
                    } else if (event.state === 'turning_on') {
                        // do whatever you want
                    } else if (event.state === 'turning_off') {
                        // do whatever you want
                    }
                }
            )
                .then(sub => {
                    this._stateChangedSubscription = sub; 
                    // remember to call this._stateChangedSubscription.remove()
                    // when you don't want to listen to this anymore
                })
                .catch(err => {
                    console.warn(err);
                })
        }
    }

    _onTagDiscovered = tag => {
        this.setState({
            detected:true
        });

        fetch(`https://cpbuaenv59.execute-api.us-east-2.amazonaws.com/staging/users?rfid=${tag.id}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
        if (data){
            this.setState({
                tag,
                detected:false,
                modalVisible:true,
                MessageBg:OkColor,
                MessageIcon:OkIcon,
                MessageTxt:'Tag identificado'
            });
            this.props.navigation.navigate('Photo', {
                userInfo:data
            });
        }else{
            this.setState({
                tag,
                detected:false,
                modalVisible:true,
                MessageBg:ErrorColor,
                MessageIcon:ErrorIcon,
                MessageTxt:'Tag no identificado'
            });
        }
        }).catch(error => console.error('Error:', error));
    }

    _goToNfcSetting = () => {
        if (Platform.OS === 'android') {
            NfcManager.goToNfcSetting()
                .then(result => {
                    console.log('goToNfcSetting OK', result)
                })
                .catch(error => {
                    console.warn('goToNfcSetting fail', error)
                })
        }
    }
    _parseUri = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    _parseText = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }
    
    render() {
        const { navigate } = this.props.navigation;
        let { supported, enabled, tag, detected } = this.state;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.content}>
                    <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onShow={()=>{
                        StatusBar.setBackgroundColor(this.state.MessageBg, true);
                        setTimeout(()=>{
                            StatusBar.setBackgroundColor('#001F45', true);
                            this.setModalVisible(!this.state.modalVisible);
                        },1500);
                    }}
                    onRequestClose={() => {
                        StatusBar.setBackgroundColor('#001F45', true);
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                        <View style={[styles.modalContainer,{backgroundColor:this.state.MessageBg}]}>
                            <View style={styles.modalContent}>
                                <Image
                                source={this.state.MessageIcon}
                                />

                                <TouchableHighlight
                                    onPress={() => {
                                        StatusBar.setBackgroundColor(this.state.MessageBg, true);
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text style={styles.modalText}>{this.state.MessageTxt}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                
                    <Image style={styles.nfcImg} source={ScanLogo} resizeMode="contain"/>
                    <Text style={styles.message}>Acerque pulsera al dispositivo</Text>
                    { this.state.detected && 
                    <Image source={Load}/>
                    }
                </View>
            </View>
        )
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