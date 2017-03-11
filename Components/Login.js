import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Navigator, StyleSheet, Image, TextInput, Dimensions, StatusBar
} from 'react-native';
import {
  Spinner, Button
} from 'native-base';

// import lib 
import Icon from 'react-native-vector-icons/Entypo';

//
var deviceScreen = Dimensions.get('window')
//
//

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      PassWord: '',
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.image} blurRadius={8} source={require('../Images/background.jpg')}>
          <TextInput placeholder='Username' style={styles.textInput} />
          <TextInput placeholder='PassWord' style={styles.textInput} />
          <View style={styles.buttonView}>
            <View style={styles.signin}>
              <Button success style={styles.btn}>
                <Text> Login </Text>
              </Button>
            </View>

            <View style={styles.signin}>
              <Button warning style={styles.btn}>
                <Text>  Sign in </Text>
              </Button>
            </View>

          </View>
          <View style={styles.sdk}>
            <Button style={{ backgroundColor: '#2980b9' }}>
              <Icon name='facebook-with-circle' style={{ fontSize: 28, color: 'black', margin: 10 }} />
              <Text>Đăng nhập với Facebook</Text>
            </Button>
          </View>
        </Image>
      </View>
    );
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
