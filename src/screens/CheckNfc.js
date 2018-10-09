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
import ModalMessage from '../components/Message'
import FBLoginButton from '../components/FBLoginButton'

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
            if (response.status === 200){
            this.setState({
                tag,
                detected:false,
                // modalVisible:true,
                MessageBg:OkColor,
                MessageIcon:OkIcon,
                MessageTxt:'Tag identificado'
            });
            this.refs.modal.show();
            this.props.navigation.navigate('Photo', {
                userInfo:JSON.parse(response._bodyInit)
            });
            }else{
                this.setState({
                    tag,
                    detected:false,
                    //modalVisible:true,
                    MessageBg:ErrorColor,
                    MessageIcon:ErrorIcon,
                    MessageTxt:'Tag no identificado'
                });
                this.refs.modal.show();
            }
        //     console.log(response);
        // return response.json();
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
                    <Image style={styles.nfcImg} source={ScanLogo} resizeMode="contain"/>
                    { this.state.enabled && 
                    <Text style={styles.message}>Acerque pulsera al dispositivo</Text>
                    }
                    { !this.state.enabled &&
                        <View>
                            <Text style={styles.message}>NFC de dispositivo esta apagado</Text>
                            <Button
                            onPress={this._goToNfcSetting}
                            title="Ir a ajustes de NFC"
                            color="#001F45"
                            />
                        </View>
                    }
                    {/* <Text style={styles.message}>Acerque pulsera al dispositivo</Text> */}
                    { this.state.detected && 
                    <Image source={Load}/>
                    }

                    {/* <ModalMessage container={this} ref = "modal" bgColor="#3b5998"/> */}

                    <ModalMessage container={this} ref = "modal" bgColor={this.state.MessageBg} message={this.state.MessageTxt} icon={this.state.MessageIcon}/>
                    <FBLoginButton/>
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