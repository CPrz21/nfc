import React, { Component } from 'react';
import { View, Button } from 'react-native';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';


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
  render() {
    return (
      <View>
          <Button onPress={this._fbAuth} title={"Login with Facebook"} />
      </View>
    );
  }
};
