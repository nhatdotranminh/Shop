import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ListView,
    Navigator,
    Image,
    StyleSheet
} from 'react-native';
import {
    Container, Header, Title, Button, Left, Right, Body, Icon
} from 'native-base'

// import screen
//
import Detail from './Detail'
// firebase config
//
import firebaseApp from './firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window')
var product = []
//
// main
export default class LaptopProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        }
        this.itemsRef = this.getRef().child('Laptop/Brand/' + this.props.brandName + '/Products');
        this.navigate = this.navigate.bind(this);
    }
    getRef() {
        return firebaseApp.ref();
    }
    componentWillMount() {
        this.itemsRef.on('value', (snap) => {
            snap.forEach((child) => {
                product.push({
                    name: child.key, price: child.val().Price, color: child.val().Color,
                    image: child.val().Image, Des: child.val().Mieuta,
                    tinhtrang: child.val().Tinhtrang, baohanh: child.val().BaoHanh, khuyenmai: child.val().Khuyenmai
                })
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(product)

            })
            product = []

        })

    }
    renderRow(Products) {
        console.log(Products.name)
        return (
            <View style={styles.row}>
                <View style={styles.square}>
                    <TouchableOpacity style={styles.productImage} onPress={() => this.navigate('Detail', Products.name,
                        Products.price, Products.color, Products.image, Products.Des, Products.tinhtrang, Products.baohanh, Products.khuyenmai, this.props.cartId)}>
                        <Image style={styles.image} source={{ uri: Products.image }} />
                    </TouchableOpacity>
                    <View style={styles.nameView}>
                        <Text style={styles.nameText}>{Products.name}</Text>
                    </View>
                </View>
            </View>
        )
    }
    navigate(routename, name, price, color, image, Des, tinhtrang, baohanh, khuyenmai, cartid) {
        this.props.navigator.push({
            id: routename,
            passProps: {
                productName: name, price: price, color: color, image: image, Mieuta: Des, tinhtrang: tinhtrang, baohanh: baohanh,
                khuyenmai: khuyenmai, cartId: cartid
            }

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header style={{ backgroundColor: '#e67e22' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigator.pop()}>
                            <Icon style={{ fontSize: 20 }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.brandName}</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={styles.contain}>
                    <ListView contentContainerStyle={styles.gridView}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)} />
                </View>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    contain: {
        flex: 10
    },
    gridView: { flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10, marginRight: 10 },
    // renderRow
    row: { height: deviceScreen.height / 3 },
    square: {
        width: (deviceScreen.width - 20) / 2 - 20,
        height: deviceScreen.width / 2 + 20,
        margin: 10,
        flexDirection: 'column',
        borderRadius: 5
    },
    productImage: {
        flex: 8,
        margin: 10
    },
    image: {
        flex: 0.6, borderRadius: 5, resizeMode: 'contain'
    },
    nameView: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        //	 backgroundColor:'#8bc34a',
        borderRadius: 15

    },
    nameText: {
        fontSize: 16, //color: 'white'
    }
})