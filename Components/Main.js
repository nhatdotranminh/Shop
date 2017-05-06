import React, { Component } from 'react';
import {
  StyleSheet,

  View,
  Navigator,
  ListView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';
// bo thu vien nativebase.io
import {
  Spinner,
  Container,
  Header,
  Item,
  Input,
  Left,
  Right,
  Body,
  Footer, FooterTab, Button, Icon, Text
} from 'native-base';
import Drawer from 'react-native-drawer';
import {
  Tile,
  Overlay,

  Title,
  Subtitle,
  Heading,
  Caption,
  Image,
  Row
} from '@shoutem/ui'
// import screen
import LaptopProducts from './LaptopProducts'
//var draScene =require('./drawerScene'); config firebase
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
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      //isVisibleisVisible: true,
      loaded: false,
      searchText: '',
      array: [],

    }

    this.itemsRef = this
      .getRef()
      .child('Laptop/Brand');
    this.navigate = this
      .navigate
      .bind(this);
    this.cartNavigate = this
      .cartNavigate
      .bind(this)
  }

  getRef() {
    return firebaseApp
      .database()
      .ref();
  }

  componentWillMount() {
    this
      .itemsRef
      .on('value', (dataSnapShot) => {
        dataSnapShot.forEach((child) => {
          arrBrand.push({
            name: child.key,
            image: child
              .val()
              .Image
          })
        })

        this.setState({
          dataSource: this
            .state
            .dataSource
            .cloneWithRows(arrBrand),
          loaded: true,
          array: arrBrand
        })
        arrBrand = []
      })

  }
  _btnSearchNavigate(routename, searchText) {
    this.props.navigator.push({
      id: routename,
      passProps:{
        searchText: searchText
      }
    })
  }

  createRow(uri) {
    console.log('state id' + this.state.cartID)
    return (
      <TouchableOpacity
        onPress={() => this.navigate('LaptopProducts', uri.name, this.props.cartId, )}>
        <Row>
          <Image
            source={{
              uri: uri.image
            }}
            styleName='medium'
            style={{
              resizeMode: 'contain'
            }} />
        </Row>

      </TouchableOpacity>
    )
  }
  navigate(routename, name, cartid, ) {
    this
      .props
      .navigator
      .push({
        id: routename,
        passProps: {
          brandName: name,
          cartId: cartid
        }

      })
  }
  cartNavigate(routeid, cartid) {
    this
      .props
      .navigator
      .push({
        id: routeid,
        passProps: {
          cartId: cartid
        }

      })
  }
  onPressAlert() {
    alert('Tính năng này chưa có')
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
          <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
          />
          <Header searchBar rounded>
            <Item>
              <Icon
                style={{
                  fontSize: 20,
                  marginLeft: 10
                }}
                name="search" />
              <Input
                placeholder="Search"
                onChangeText={(text) => this.setState({ searchText: text })}
                value={this.state.searchText} />

            </Item>
            <Button transparent onPress={() => this._btnSearchNavigate('Search', this.state.searchText)}>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={styles.scrollViewBar}>
            <ScrollView
              horizontal={true}
              automaticallyAdjustContentInsets={false}
              style={[styles.scrollView, styles.horizontalScrollView]}>
              {this
                .state
                .array
                .map(this.createRow.bind(this))}
            </ScrollView>
          </View>
          <View style={styles.mainContainer}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              style={[styles.scrollView, styles.horizontalScrollView]}>
              <Tile styleName="text-centric">
                <Overlay>
                  <Heading>-20%</Heading>
                </Overlay>
                <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
                <Subtitle styleName="line-through sm-gutter-top">$280</Subtitle>
                <Heading>$250</Heading>
                <Button dark transparent><Icon name="cart" />
                  <Text>ADD TO BASKET</Text>
                </Button>
              </Tile>
              <Tile>
                <Image styleName="large-banner" source={require('../Images/image-5.png')} />
                <View styleName="content">
                  <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
                  <View styleName="horizontal space-between">
                    <Caption>1 hour ago</Caption>
                    <Caption>15:34</Caption>
                  </View>
                </View>
              </Tile>
            </ScrollView>
          </View>
          <Footer >
            <FooterTab>
              <Button>
                <Icon name="cart" onPress={() => this.cartNavigate('Cart', this.props.cartId)} />
                <Text>Giỏ hàng</Text>
              </Button>
              <Button hidden={true}>
                <Icon name="camera" onPress={() => this.onPressAlert()} />
                <Text>Camera</Text>
              </Button>
              <Button >
                <Icon active name="navigate" onPress={() => this.onPressAlert()} />
                <Text>Navigate</Text>
              </Button>
              <Button>
                <Icon name="person" onPress={() => this.navigate('UserInfor')} />
                <Text>Contact</Text>
              </Button>
            </FooterTab>
          </Footer>

        </Container>

      )
    }

  }

}
var styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', //backgroundColor:"#d35400"
  },
  container: {
    flex: 1
  },

  scrollViewBar: {
    flex: 2.5,
    //backgroundColor:'#2ecc71'
  },
  mainContainer: {
    flex: 9,
    backgroundColor: '#ecf0f1'
  },
  menubar: {
    flex: 0.5,
    backgroundColor: '#3498db',
    marginTop: 20,
    flexDirection: 'row'
  },
  scrollView: {
    height: deviceScreen.height / 4
  },
  horizontalScrollView: {
    height: 150
  },
  /*
  card: {
    paddingTop: 10,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'space-around'
  },
  img: {
    height: deviceScreen.height / 5 - 20,
    width: deviceScreen.height / 5 - 10,
    justifyContent: 'space-around',
    resizeMode: 'center'
  },*/

})
