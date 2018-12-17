import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, WebView, Linking} from 'react-native';
import { Header, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createAppContainer } from "react-navigation"
import axios from 'axios'

class IntroScreen extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{flex:1}}>
        </View>
        <Image
          source={require('./src/images/outco-logo.png')}
          style={{width:200, height:210 }}
        />
        <Text
          style={{fontSize:35, fontWeight:'800', paddingBottom:40, paddingTop: 40}}>
          Outmatched Mobile
        </Text>

        <View style={styles.buttonStyle}>
          <Icon.Button name="logo-octocat" backgroundColor="#000000" onPress={() => this.props.navigation.navigate('Login')}>
            Login with Github
          </Icon.Button>
        </View>
        <View style={{flex:3}}>
        </View>
              </View>

    );
  }
}
class WebAuth extends Component {

  render() {
    const uri = 'https://github.com/login/oauth/authorize?client_id=4b9563d4e039d8af962a';
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(uri);
          }
        }}
      />
    );
  }

}
class LoginScreen extends Component {

state = { email: '', password: '', error: '', loading: false };



  onButtonPress() {
    const password = this.state.password;
    const email = this.state.email;
    this.setState({ error: '', loading: true });
axios.get('https://github.com/login/oauth/authorize?client_id=4b9563d4e039d8af962a').then(response => console.log(response.data));

  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login</Text>
        <View style={{width:350 }}>
          <FormLabel>
            Email
            </FormLabel>
          <FormInput
          editable={true}
          containerStyle= { {paddingLeft:2}}
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email} />
          <FormLabel>
            Password
            </FormLabel>
          <FormInput
          editable={true}
          containerStyle= { {paddingLeft:2}}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}/>
          <Button
          backgroundColor="#0099ff"
          title='Submit request'
          onPress={this.onButtonPress.bind(this)}
          containerStyle={{paddingTop:30}}/>
          <Button
          backgroundColor="#0099ff"
          title='toWeb'
          onPress={() => this.props.navigation.navigate('Web')}
          containerStyle={{paddingTop:30}}/>

        </View>
      </View>
    );
  }
}


const AppNavigator = createStackNavigator({
  Home:IntroScreen,
  Login:LoginScreen,
  Web:WebAuth
},
  {
    initialRouteName:"Home"
  });

export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonStyle: {
    flex:0,
    backgroundColor:'#000000',
    flexDirection:'column',
    alignItems:'stretch'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
