import React, { Component } from 'react';
import { Text, View, AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import { Screen, Button, Divider, Caption } from '@shoutem/ui'

const firebase = require('firebase');
import firebaseApp from '../Help/firebase';
//var value, name, email;
var dpName, mail, emailVerified, imgURL, uid, providerData;
var deviceScreen = Dimensions.get('window')
export default class UserInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: '',
            displayName: '',
            email: '',
            photoURL: '',
            uid: ''


        }
    }
    componentDidMount() {
        // this._loadInitialState().done();
        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                dpName = user.displayName;
                mail = user.email;
                emailVerified = user.emailVerified;
                imgURL = user.photoURL;
                // var isAnonymous = user.isAnonymous;
                uid = user.uid;
                providerData = user.providerData;
                // ...

            } else {
                // User is signed out.
                // ...
            }
        });
        this.setState({
            displayName: dpName,
            email: mail,
            photoURL: imgURL
        })

    }

    /* _loadInitialState = async () => {
         try {
             value = await AsyncStorage.getItem('user_UID');
             if (value !== null) {
                 this.setState({ selectedValue: value });
 
             } else {
             }
         } catch (error) {
             console.log(error)
         }
     };
     /* _removeStorage = async () => {
          try {
              await AsyncStorage.removeItem('user_UID');
  
          } catch (error) {
  
          }
      };*/
    _logOut() {
        firebaseApp.auth().signOut().then(function () {
            console.log("Ban da dang xuat")
        }).catch(function (error) {
            // An error happened.
        });
        /* async () => {
             try {
                 await AsyncStorage.removeItem('user_UID');
 
             } catch (error) {
 
             }
         }*/
        this.props.navigator.push({
            id: 'Login',
            passProps: {
            }
        });


    }/*
    <TextInput
                        placeholder='Họ và tên'
                        onChangeText={(text) => this.setState({ displayName: text })}
                        style={styles.textInput}
                        value={this.state.displayName}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        autoCapitalize='sentences' />
                    <Button onPress={() => this._updateInfo()}><Text>Cập nhập</Text></Button>
    _updateInfo() {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: this.state.displayName,
        }).then(function () {
            // Update successful.
        }, function (error) {
            // An error happened.
        });
    }*/
    render() {
        if (this.state.uid == "" || this.state.uid == null) {
            return (
                <Screen>
                    <Text>Ban chua dang nhap</Text>
                </Screen>
            );
        }
        else {
          //  console.log(this.state.selectedValue)
            return (
                <Screen>
                    <View style={{ padding: 10 }}>
                        <Divider styleName="section-header">
                            <Caption>Tên</Caption>
                            <Caption>{this.state.displayName}</Caption>
                        </Divider>
                        <Divider styleName="section-header">
                            <Caption>Email</Caption>
                            <Caption>{this.state.email}</Caption>
                        </Divider>


                        <Button onPress={() => this._logOut()}><Text>Log out</Text></Button>


                    </View>
                </Screen>
            );
        }
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: deviceScreen.width - 20,
        padding: 10,
        margin: 10
    }
})