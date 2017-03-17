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
import firebaseApp from '../Help/firebase';
//
var deviceScreen = Dimensions.get('window')
//
//

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            verifypassword: ""
        }
    }
    // create firebase email and password

    btnSiginPressed(email, password) {
        if (email === password) {
            console.log('email password không đươcj trùng nhau')
        } else {
            if (password === this.state.verifypassword) {
                firebaseApp.auth().createUserWithEmailAndPassword(email, password)
                    .catch(function (error) {
                        console.log("Register eror" + error);
                        if (error.code === 'auth/email-already-in-use') {
                            alert('Email already use')
                        }
                    })
            } else {
                console.log('Verify PassWord is not match')
            }
        }

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

                    />
                    <TextInput placeholder='PassWord'
                        onChangeText={(text) => this.setState({ password: text })}
                        secureTextEntry={true}
                        style={styles.textInput}
                        value={this.state.password}
                        placeholderTextColor='black'
                    />
                    <TextInput placeholder='Verify PassWord'
                        onChangeText={(text) => this.setState({ verifypassword: text })}
                        secureTextEntry={true}
                        style={styles.textInput}
                        value={this.state.verifypassword}
                        placeholderTextColor='black'
                    />
                    <View style={styles.buttonView}>
                        <View style={styles.signin}>
                            <Button success style={styles.btn} onPress={() => this.btnSiginPressed(this.state.email, this.state.password)}>
                                <Text> Create an account </Text>
                            </Button>
                        </View>

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
    signin: {
        padding: 10
    }

})

module.exports = Login;
