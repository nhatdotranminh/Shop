import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Navigator, StyleSheet, Image, TextInput, Dimensions, AsyncStorage
} from 'react-native';
import {
  Spinner, Button, Toast
} from 'native-base';

// import lib 
import Icon from 'react-native-vector-icons/Entypo';
//
//
const firebase = require('firebase');

import firebaseApp from '../Help/firebase';
import UserInfor from './UserInfor';
//
var deviceScreen = Dimensions.get('window')
var provider = new firebase.auth.FacebookAuthProvider();
var usemail = '';

provider.setCustomParameters({
  'display': 'popup'
});

//
//

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",


    }
    this.btnLoginPressed = this.btnLoginPressed.bind(this);

  }

  // login firebase email and password
  btnLoginPressed(email, password) {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // handle error
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          Toast.show({
            type: 'warning',
            text: 'Sai mật khẩu',
            position: 'bottom',
            buttonText: 'Ok'
          })
          return;
        } else {
          console.log('Sign in Error:' + errorMessage);
        }
        if (errorCode == 'auth/invalid-email') {
          Toast.show({
            type: 'warning',
            text: 'Địa chỉ Email không hợp lệ',
            position: 'bottom',
            buttonText: 'Ok'
          })
          return;
        }
      })
      .then(function (user) {
        if (user != null) {
          this.props.navigator.push({
            id:'Main'
          })
        } else {
          Toast.show({
            type: 'danger',
            text: 'Bạn chưa nhập email và mật khẩu',
            position: 'bottom',
            duration: 2000
          })
        }
      })
    /*  firebase.auth().onAuthStateChanged(function (user) {
        if (user !== null) {
          console.log(user.uid)
          console.log(user.email)
          console.log(user.displayName)
          AsyncStorage.setItem("user_UID", user.uid)
        }
        else {
          console.log('not logged in')
        }
      });
      /*
      try {
        const value = AsyncStorage.getItem('user_UID');
        if (value !== null) {
          // We have data!!
          this.navigate('Main')
          console.log(value);
  
        }
      } catch (error) {
        // Error retrieving data
      }*/

  }

  navigate(routeid) {
    this.props.navigator.push({
      id: routeid
    })
  }

  render() {

    return (
      <View style={styles.container}>

        <Image style={styles.image} blurRadius={8} source={require('../Images/background.jpg')}>
          <TextInput placeholder='Email'
            onChangeText={(text) => this.setState({ email: text })}
            style={styles.textInput}
            value={this.state.email}
            placeholderTextColor='black'
            autoCorrect={false}
            autoFocus={true}
          />
          <TextInput placeholder='PassWord'
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true}
            style={styles.textInput}
            value={this.state.password}
            placeholderTextColor='black'
            autoCorrect={false}
            autoFocus={false}
          />
          <View style={styles.buttonView}>
            <View style={styles.signin}>
              <Button success style={styles.btn} onPress={() => this.btnLoginPressed(this.state.email, this.state.password)}>
                <Text> Login </Text>
              </Button>
            </View>

            <View style={styles.signin}>
              <Button warning style={styles.btn} onPress={() => this.navigate('Resgister')}>
                <Text>  Sign in </Text>
              </Button>
            </View>

          </View>
          <View style={styles.sdk}>
            <Button style={{ backgroundColor: '#2980b9' }}
              onPress={() => this.fbLogin()}
            >
              <Icon name='facebook-with-circle' style={{ fontSize: 28, color: 'black', margin: 10 }} onPress={() => this.fbLogin()} />
              <Text>Đăng nhập với Facebook</Text>
            </Button>
          </View>
        </Image>
      </View>
    );


  };

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop:20

  },
  textInput: {
    height: 40, borderColor: 'gray', borderWidth: 1,
    width: deviceScreen.width - 20,
    padding: 10,
    margin: 10
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  sdk: {
    padding: 10
  },
  signin: {
    padding: 10
  }

})

module.exports = Login;
