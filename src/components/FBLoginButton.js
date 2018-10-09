import React, { Component } from 'react';
import { View, Button } from 'react-native';
import FBSDK, {LoginManager, AccessToken, ShareDialog} from 'react-native-fbsdk';


export default class FBLoginButton extends Component {
    _fbAuth(){
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function(result) {
            if (result.isCancelled) {
            alert('Login was cancelled');
            } else {
                console.log('Login success with permissions: ' + JSON.stringify(result));

            AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data);
                const { accessToken } = data

                fetch(`https://graph.facebook.com/me?access_token=${data.accessToken.toString()}&fields=id,name,email,picture`)
                        .then((response) => response.json()).then((res) => {
                            var socialOptions = {
                            Id:res.id,
                            Email: res.email,
                            Name: res.name,
                            Picture:res.picture,
                            Token: data.accessToken.toString(),
                            UID: data.userID,
                            loginType: 'facebook',
                            }
                            console.log(JSON.stringify(socialOptions));
                        })
                        .catch((err) => console.log('error occurred', err.message));
                        })
            }
            },
            function(error) {
                console.log('Login failed with error: ' + error);
            }
        );
    }

    login(){
        var shareLinkContent = {
            contentType: 'link',
            contentUrl: 'https://s3.us-east-2.amazonaws.com/bt7-photo-booth/281ee714-944d-4969-b25f-a80f0fe57203.png',
            contentDescription: 'Wow, check out this great site BT7!'
        };
        const accessToken='EAAENhaQSgZBwBACZA0uaegkXGQGUrhAOiKZCKEkf0JHjVJEdJMm8gpZAMuJKdZBeWBcA40OukSdklvsOT4DUJ2nfAwMME8ZCWYDeKjkM38W6Y4bAc4qTowhkUPg4HK9vqZCQf78AWMoRZALDEU2anvvwwftNS9bbWCZBI3t9dCGAfeTw3gJZAuchlj5Hmmk6l1Wb4ZD';
        fetch(`https://graph.facebook.com/me?access_token=${accessToken.toString()}&fields=id,name,email,picture`)
        .then((response) => response.json()).then((res) => {
            var socialOptions = {
            Id:res.id,
            Email: res.email,
            Name: res.name,
            Picture:res.picture,
            // Token: data.accessToken.toString(),
            // UID: data.userID,
            loginType: 'facebook',
            }
            console.log(JSON.stringify(socialOptions));
            // Share the link using the share dialog.
                var tmp = this;
                ShareDialog.canShow(shareLinkContent).then(
                  function(canShow) {
                    if (canShow) {
                      return ShareDialog.show(shareLinkContent);
                    }
                  }
                ).then(
                  function(result) {
                    if (result.isCancelled) {
                      console.log('Share cancelled');
                    } else {
                      console.log('Share success with postId: '
                        + result.postId);
                    }
                  },
                  function(error) {
                    console.log('Share fail with error: ' + error);
                  }
                );

            
        })
        .catch((err) => console.log('error occurred', err.message));
                        
    }
  render() {
    return (
      <View>
          <Button onPress={this.login} title={"Login with Facebook"} />
      </View>
    );
  }
};
