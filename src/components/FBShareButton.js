import React, { Component } from 'react';
import { View, Button,TouchableHighlight, Text } from 'react-native';
import { ShareDialog } from 'react-native-fbsdk';
const FBSDK = require('react-native-fbsdk');
const {
  ShareApi,
} = FBSDK;


export default class FBShareButton extends Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://s3.us-east-2.amazonaws.com/bt7-photo-booth/281ee714-944d-4969-b25f-a80f0fe57203.png',
            contentDescription: 'Wow, check out this great site BT7!'
        };
        


        this.state = {
            shareLinkContent: shareLinkContent,
        };
    }

    // Share the link using the share dialog.
    shareLinkWithShareDialog() {
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
        function(canShow) {
            if (canShow) {
            return ShareDialog.show(tmp.state.shareLinkContent);
            }
        }
        ).then(
        function(result) {
            if (result.isCancelled) {
            console.log('Share cancelled');
            } else {
            console.log('Share success with postId: '+ result.postId);
            }
        },
        function(error) {
            console.log('Share fail with error: ' + error);
        }
        );
    }

    
    render() {
        return (
        <View>
            <TouchableHighlight
                onPress={this.shareLinkWithShareDialog.bind(this)}>
                <Text>Share link with ShareDialog</Text>
            </TouchableHighlight>
        </View>
        );
    }
};
