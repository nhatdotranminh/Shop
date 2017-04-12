import React, { Component } from 'react';
import {
  View,

  Alert,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Navigator,
  ListView
} from 'react-native';

import {Button, Thumbnail, List, ListItem, Text, Left, Right, Body, Icon, } from 'native-base'
import {Tile, Title, Subtitle, Screen, Caption, Overlay } from '@shoutem/ui'
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
      avatarimg: require('../Images.gray.jpeg'),
      componentName: ''

    };
    this.onItemSelect = this.onItemSelect.bind(this);
    _navigate = this.props.navigate;

  }
  componentWillMount() {

  }


  onItemSelect(item) {

    _navigate(item);
  }
  notice() {
    Alert.alert('Thông báo', 'Chức năng này chưa mở', [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed')
      }
    ], { cancelable: false })
  }

  /*<Image
            style={{ width: deviceScreen.width / 1.5 }}
            source={require('../Images/logo.jpeg')} />*/
  render() {
    return (
     <Screen>
        <View style={{ flex: 2.5, backgroundColor: 'green' }}>

        </View>

        <View style={styles.content}>
           <List>
            <ListItem button onPress={() => this.onItemSelect('Main')}>
              <Left>
                <Icon name="home" style={{ color: '#0A69FE' }} />
                <Text>Home</Text>
              </Left>

            </ListItem>
            <ListItem button onPress={() => this.onItemSelect('Login')} >
              <Left>
                <Icon name="people" style={{ color: '#0A69FE' }} />
                <Text>Đăng nhập</Text>
              </Left>
            </ListItem>

          </List>
         
       </View>
       

      </Screen>

    )
  }
}



/* <ListView
             style={styles.container}
             dataSource={this.state.dataSource}
             renderRow={(item) => this._renderMenuItem(item)} />*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  userInfo: {
    marginTop: 20,
    flex: 1.5,
   
  },
  main: {
    flex: 1.5,
   
  },
  content: {
    flex: 3,
    
  }
})