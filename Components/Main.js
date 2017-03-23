import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
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
  Body
} from 'native-base';
import Drawer from 'react-native-drawer';
import {
  Tile,
  Overlay,
  Icon,
  Title,
  Subtitle,
  Heading,
  Button,
  Caption,
  Image,
  Row
} from '@shoutem/ui'
// import screen
import LaptopProducts from './LaptopProducts'
//var draScene =require('./drawerScene'); config firebase
import firebaseApp from '../Help/firebase';

//
var Tonggia;
var GiohangID;
var newPostKey = firebaseApp
  .database()
  .ref()
  .child('Cart')
  .push()
  .key;
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
      cartID: '',
      Tong: ''
    }
    GiohangID= this.props.cartId
    if (this.props.Tong != null && this.props.Tong == 0) {
      Tonggia = this.props.Tong
    } else {
      console.log('Chưa có tổng')
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
          array: arrBrand,
          Tong: Tonggia
        })
        arrBrand = []
      })
    if (GiohangID == '' || GiohangID == undefined) {

      this.setState({cartID: newPostKey})

    } else {
      this.setState({cartId: this.props.cartId})
    }
    console.log('props id' + this.props.cartId)
    console.log("Main cart Id" + newPostKey)
    console.log("Main cart Id" + this.state.cartID)

  }
  createRow(uri) {
    return (
      <TouchableOpacity
        onPress={() => this.navigate('LaptopProducts', uri.name, this.state.cartID, this.state.Tong)}>
        <Row>
          <Image
            source={{
            uri: uri.image
          }}
            styleName='medium'
            style={{
            resizeMode: 'contain'
          }}/>
        </Row>

      </TouchableOpacity>
    )
  }
  navigate(routename, name, cartid, tonggiatri) {
    this
      .props
      .navigator
      .push({
        id: routename,
        passProps: {
          brandName: name,
          cartId: cartid,
          Tonggiatri: tonggiatri
        }

      })
  }
  cartNavigate(routeid, cartid, tonggiatri) {
    this
      .props
      .navigator
      .push({
        id: routeid,
        passProps: {
          cartId: cartid,
          Tonggiatri: tonggiatri
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
          <Spinner color="#58FAF4"/>
        </View>
      )
    } else {
      console.log(this.state.searchText)
      return (
        <Container>
          <Header style={{
            backgroundColor: '#3498db'
          }}>
            <Left>
              <Button styleName='clear'>
                <Text>
                  Menu
                </Text>
              </Button>
            </Left>
            <Body></Body>
            <Right>
              <Button
                styleName='clear'
                onPress={() => this.cartNavigate('Cart', this.state.cartID, this.state.Tong)}>
                <Icon
                  style={{
                  color: '##2ecc71',
                  fontSize: 20
                }}
                  name='cart'/>
              </Button>
            </Right>
          </Header>
          <Header searchBar rounded>
            <Item>
              <Icon
                style={{
                fontSize: 20,
                marginLeft: 10
              }}
                name="search"/>
              <Input
                placeholder="Search"
                onChangeText={(text) => this.setState({searchText: text})}
                value={this.state.text}/>

            </Item>
            <Button styleName='clear'>
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
                <Button styleName="dark md-gutter-top"><Icon name="cart"/>
                  <Text>ADD TO BASKET</Text>
                </Button>
              </Tile>
              <Tile>
                <Image styleName="large-banner" source={require('../Images/image-5.png')}/>
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
