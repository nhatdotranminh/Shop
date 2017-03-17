import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';
// bo thu vien nativebase.io
import {
  Spinner, Container, Header, Item, Input, Button, Left, Right, Body
} from 'native-base';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import screen
import LaptopProducts from './LaptopProducts'
//var draScene =require('./drawerScene');
// config firebase
import firebaseApp from '../Help/firebase';

//
//
// khai bao cac bien
var deviceScreen = Dimensions.get('window')
var arrBrand = []
//
// classs chinh
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      //isVisibleisVisible: true,
      loaded: false,
      searchText: '',
      array: []
    }
    console.log('Main' + this.props.cartId)
    this.itemsRef = this.getRef().child('Laptop/Brand');
    this.navigate = this.navigate.bind(this);
    this.cartNavigate = this.cartNavigate.bind(this)

  }
  getRef() {
    return firebaseApp.database().ref();
  }
  componentWillMount() {
    this.itemsRef.on('value', (dataSnapShot) => {
      dataSnapShot.forEach((child) => {
        arrBrand.push({ name: child.key, image: child.val().Image })
      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(arrBrand),
        loaded: true,
        array: arrBrand
      })
      arrBrand = []
    })
  }
  createRow(uri) {
    return (
      <TouchableOpacity style={styles.card}
        onPress={() => this.navigate('LaptopProducts', uri.name, this.props.cartId)}
      >
        <Image source={{ uri: uri.image }} style={styles.img} />

      </TouchableOpacity>
    )
  }
  navigate(routename, name, cartid) {
    this.props.navigator.push({
      id: routename,
      passProps: {
        brandName: name,
        cartId: cartid
      }

    })
  }
  cartNavigate(routeid, cartid) {
    this.props.navigator.push({
      id: routeid,
      passProps: {
        cartId: cartid
      }

    })
  }
  //
  //
  // render
  render() {
    if (this.state.loaded == false) {
      return (
        <View style={styles.containerLoad}>
          <Spinner color="#58FAF4" />
        </View>
      )
    } else {
      console.log(this.state.searchText)
      return (
        <Container>
          <Header style={{ backgroundColor: '#34495e' }}>
            <Left>
              <Button transparent >
                <Text> Menu </Text>
              </Button>
            </Left>
            <Body>

            </Body>
            <Right>
              <Button transparent onPress={() => this.cartNavigate('Cart', this.props.cartId)}>
                <Icon style={{ color: '#2980b9', fontSize: 20 }} name='shopping-cart' />
              </Button>
            </Right>
          </Header>
          <Header searchBar rounded  >
            <Item>
              <Icon style={{ fontSize: 20, marginLeft: 10 }} name="search" />
              <Input placeholder="Search"
                onChangeText={(text) => this.setState({ searchText: text })}
                value={this.state.text} />
              <Icon style={{ fontSize: 20, marginRight: 10 }} active name="people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={styles.scrollViewBar}>
            <ScrollView
              horizontal={true}
              automaticallyAdjustContentInsets={false}
              style={[styles.scrollView, styles.horizontalScrollView]}
            >
              {this.state.array.map(this.createRow.bind(this))}
            </ScrollView>
          </View>
          <View style={styles.mainContainer}>

          </View>


        </Container>

      )
    }

  }


}
var styles = StyleSheet.create({
  containerLoad: {
    flex: 1, justifyContent: 'center', alignItems: 'center', //backgroundColor:"#d35400"
  },
  container: {
    flex: 1,
  },

  scrollViewBar: {
    flex: 2.5,
    //backgroundColor:'#2ecc71'
  },
  mainContainer: {
    flex: 9,
    backgroundColor: '#f1c40f'
  },
  menubar: {
    flex: 0.5,
    backgroundColor: '#3498db',
    marginTop: 20,
    flexDirection: 'row'
  },
  scrollView: { height: deviceScreen.height / 4, },
  horizontalScrollView: { height: 150, },
  card: {
    paddingTop: 10,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'space-around',

  },
  img: {
    height: deviceScreen.height / 5 - 20,
    width: deviceScreen.height / 5 - 10,
    justifyContent: 'space-around',
    resizeMode: 'center',
  },
  menuImg: {
    height: 25,
    width: 25,
    justifyContent: 'flex-start',
    marginLeft: 10
  },
  leftMenu: {
    flex: 1
  },
  rightMenu: {
    flex: 5
  }

})
