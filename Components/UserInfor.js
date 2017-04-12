import React, { Component } from 'react';
import { Text, View, AsyncStorage, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native'
import { Screen, Button, Divider, Caption } from '@shoutem/ui'

const firebase = require('firebase');
import firebaseApp from '../Help/firebase';
var value, name, email;
var deviceScreen = Dimensions.get('window')
export default class UserInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: '',
            displayName: '',
            email: ''

        }
    }
    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            value = await AsyncStorage.getItem('user_UID');
            if (value !== null) {
                this.setState({ selectedValue: value });

            } else {
            }
        } catch (error) {
            console.log(error)
        }
        try {
            name = await AsyncStorage.getItem('user_displayName');
            if (name !== null) {
                this.setState({ displayName: name});

            } else {
                this.setState({displayName: ""})
            }
        } catch (error) {
            console.log(error)
        }
        try {
            email = await AsyncStorage.getItem('user_Email');
            if (email !== null) {
                this.setState({ email: email });

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
        firebase.auth().signOut().then(function () {
            console.log("Ban da dang xuat")
        }).catch(function (error) {
            // An error happened.
        });
        async () => {
            try {
                await AsyncStorage.removeItem('user_UID');

            } catch (error) {

            }
        }
        this.props.navigator.push({
            id: 'Login',
            passProps: {
                flag: 1
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

        console.log(this.state.selectedValue)
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