import React, {Component} from 'react';
import {
  View, Text,TouchableOpacity,Navigator,StyleSheet, Image, TextInput,Dimensions, StatusBar
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

class Login extends Component{
  constructor(props){
    super(props)
    this.state ={
      userName:'',
      PassWord:'',
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <StatusBar hidden='true'/>
        <Image style={styles.image}   blurRadius={8} source={require('../Images/background.jpg')}>
          <TextInput placeholder='Username' style={styles.textInput}/>
          <TextInput placeholder='PassWord' style={styles.textInput}/>
          <View style={styles.buttonView}>
            <Button block success>
              <Text>
                Login
              </Text>
            </Button>
          </View>
          <View style={styles.sdk}>
            <Button style={{backgroundColor:'#2980b9'}}>
              <Icon name='facebook-with-circle' style={{fontSize: 28, color: 'black', margin: 10}}/>
              <Text>Đăng nhập với Facebook</Text>
            </Button>
          </View>
        </Image>
      </View>
    );
  }
}

var styles= StyleSheet.create({
  container:{
    flex: 1
  },
  image:{
    flex:1,
    height: null,
    width:null,
    resizeMode:'cover',
    justifyContent:'center',
    alignItems:'center'
  
  },
  textInput:{
    height: 40, borderColor: 'gray', borderWidth: 1,
    width:deviceScreen.width -20,
    padding: 10,
    margin: 10
  },
  buttonView:{
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  sdk:{
    padding: 10
  }
})

module.exports=Login;
