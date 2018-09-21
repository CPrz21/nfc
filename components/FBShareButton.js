import React, { Component } from 'react';
import { View, Button,TouchableHighlight, Text } from 'react-native';
import { ShareDialog } from 'react-native-fbsdk';


export default class FBShareButton extends Component {
    constructor(props) {
        super(props);
        const shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://bt7festival.com/',
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
