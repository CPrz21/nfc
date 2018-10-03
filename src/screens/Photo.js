import React, {Component} from 'react';
import {View} from 'react-native'
import PhotoBooth from '../components/Camera'

export default class Photo extends Component {
    render(){
        return(
            <View style={{flex: 1,
                alignItems: 'center'}}>
                <PhotoBooth/>
            </View>
        )
    }
}