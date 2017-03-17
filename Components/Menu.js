import React, { Component } from 'react';
import {
  View,
  Text, Alert,
  StyleSheet, Image, Dimensions, TouchableOpacity, Navigator, ListView,

} from 'react-native';

import {
  Icon, Button, Thumbnail
} from 'native-base'
//
import firebaseApp from '../Help/firebase';
//

import Login from './Login'


var deviceScreen = Dimensions.get('window')
var _navigate;

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      avatarimg: require('../Images.gray.jpeg'),
      email: 'email'
    };
    _navigate = this.props.navigate;
  }
  componentWillMount() {
    var user = firebaseApp.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      console.log(user.email)
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
    //console.log(user.email)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(['Main', 'Login']),
      email: email
    });
    console.log(this.state.email)
  }

  _renderMenuItem(item) {
    return (
      <Button transparent onPress={() => this.onItemSelect(item)}><Text style={{ color: 'white' }}>{item}</Text></Button>
    );
  }
  onItemSelect(item) {
    _navigate(item);
  }
  logout() {
    firebaseApp.auth().signOut().then(function () {
      console.log('Sign-out successful.')
    }).catch(function (error) {
      // An error happened.
    });
    alert('Ban da logout')
  }


  render() {
    return (

      <View style={styles.container}>

        <View style={styles.userInfo}>
          <View style={styles.userView}>
            <Thumbnail style={{ width: 80, height: 80, borderRadius: 40 }} source={require('../Images/gray.jpeg')} />
            <Text style={styles.nameText}>{this.state.email}</Text>
          </View>
          <View style={styles.logout}>
            <Button transparent onPress={() => this.logout()}><Text style={styles.logoutText}>Logout</Text></Button>
          </View>

        </View>
        <View style={styles.main}>
          <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(item) => this._renderMenuItem(item)}
          />
        </View>
        <View style={styles.content}>
        </View>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495e'
  },
  userInfo: {
    marginTop: 20,
    flex: 1.5,
    borderWidth: 0.5
  },
  main: {
    flex: 1.5,
    borderWidth: 0.5
  },
  content: {
    flex: 5,
    borderWidth: 0.5
  },
  userView: {
    flexDirection: 'row',
    margin: 10,
    flex: 1
  },
  nameText: {
    padding: 10,
    fontSize: 16,
    color: 'white'
  },
  logout: {
    flex: 0.5,
    //padding: 10,
    margin: 10
  },
  logoutText: {
    fontSize: 16, color: 'white'
  }


})
