import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Navigator, StyleSheet, Image, TextInput, Dimensions,
} from 'react-native';
import {
  Spinner, Button
} from 'native-base';

// import lib 
import Icon from 'react-native-vector-icons/Entypo';
//
//
const firebase = require('firebase');
import firebaseApp from '../Help/firebase';
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
      loginstatus: false,
      useremail: ''

    }
    this.btnLoginPressed = this.btnLoginPressed.bind(this);
  }
  conponentDidMount() {
    if (usemail != '') {
      this.setState({
        loginstatus: true,
        useremail: usemail
      })
    } else {
      this.setState({
        loginstatus: false

      })
    }
    usemail = '';
   
  }

  // login firebase email and password
  btnLoginPressed(email, password) {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // handle error
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          console.log('Sign in Error:' + errorMessage);
        }
      })
    firebase.auth().onAuthStateChanged(function (user) {
      if (user != null) {
        usemail = user.email
        console.log(user.uid)
        
      }
      else {
        console.log('not logged in')
      }
    });

  }

  navigate(routeid) {
    this.props.navigator.push({
      id: routeid
    })
  }

  render() {
    if (this.state.loginstatus == true) {
      return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
          <Text>{this.state.useremail}</Text>
        </View>
      )
    } else {

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
