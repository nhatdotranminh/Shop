import React, {Component} from 'react';
import {TouchableOpacity, Dimensions, Navigator, StyleSheet} from 'react-native';
import {Container, Header, Left, Right, Body} from 'native-base'
import {
    Image,
    ListView,
    Tile,
    Title,
    Subtitle,
    Overlay,
    Screen,
    Card,
    Heading,
    Icon,
    Button,
    GridRow,
    Caption,
    View,
    Text
} from '@shoutem/ui';
// import screen
//
import Detail from './Detail'
// firebase config
//
import firebaseApp from '../Help/firebase';
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
            array: [],
            newCartId:this.props.cartId
        }
        this.itemsRef = this
            .getRef()
            .child('Laptop/Brand/' + this.props.brandName + '/Products');
        this.navigate = this
            .navigate
            .bind(this);
         console.log("Product ID "+ this.props.cartId)
    }

    getRef() {
        return firebaseApp
            .database()
            .ref();
    }
    componentWillMount() {
        console.log("products id "+ this.props.cartId)
        this
            .itemsRef
            .on('value', (snap) => {
                snap.forEach((child) => {
                    product.push({
                        name: child.key,
                        price: child
                            .val()
                            .Price,
                        color: child
                            .val()
                            .Color,
                        image: child
                            .val()
                            .Image,
                        Des: child
                            .val()
                            .Mieuta,
                        tinhtrang: child
                            .val()
                            .Tinhtrang,
                        baohanh: child
                            .val()
                            .BaoHanh,
                        khuyenmai: child
                            .val()
                            .Khuyenmai
                    })
                })

                this.setState({array: product})
                product = []

            })

    }

    renderRow(Products) {

        const cellViews = _.map(Products, (item) => {
            return (

                <Card>
                    <TouchableOpacity
                        style={styles.productImage}
                        onPress={() => this.navigate('Detail', item.name, item.price, item.color, item.image, item.Des, item.tinhtrang, item.baohanh, item.khuyenmai, this.state.newCartId, )}>
                        <Image
                            style={{
                            resizeMode: 'center'
                        }}
                            styleName="medium-wide"
                            source={{
                            uri: item.image
                        }}/>
                    </TouchableOpacity>
                    <View styleName="content">
                        <Subtitle>{item.name}</Subtitle>
                        <View styleName="horizontal v-center space-between">
                            <View styleName="horizontal">
                                <Text styleName="md-gutter-right">{item.price}</Text>
                                <Caption styleName="line-through">$120.00</Caption>
                            </View>
                            <Button
                                onPress={() => this.orderNavigate('Cart', item.name, item.price, item.image,this.state.newCartId)}
                                styleName="tight clear"><Icon name="cart"/></Button>
                        </View>
                    </View>
                </Card>

            );
        })

        return (

            <GridRow columns={2}>

                {cellViews}

            </GridRow>

        )
    }
    // truyền qua detail
    navigate(routename, name, price, color, image, Des, tinhtrang, baohanh, khuyenmai, cartid, ) {
        this
            .props
            .navigator
            .push({
                id: routename,
                passProps: {
                    productName: name,
                    price: price,
                    color: color,
                    image: image,
                    Mieuta: Des,
                    tinhtrang: tinhtrang,
                    baohanh: baohanh,
                    khuyenmai: khuyenmai,
                    cartId: cartid,
                   
                }

            })
    }
    // oder truyen qua cart
    orderNavigate(routename, name, price, image, cartid) {
        var date = new Date().toDateString()
            var childId = this
                .getRef()
                .child('Cart/' + cartid + '/Hanghoa/')
                .push()
                .key;
            firebaseApp
                .database()
                .ref('/Cart/' + cartid + '/Hanghoa/' + childId)
                .set({ProductName: name, Price: price, Image: image, Ngaynhap: date});
            this
                .props
                .navigator
                .push({
                    id: routename,
                    passProps: {
                        cartId: cartid,
                        price: price,
                        
                    }
                })
       
    }

    render() {
        const groupedData = GridRow.groupByRows(this.state.array, 2)
        return (
            <Screen>
                <Header
                    style={{
                    backgroundColor: '#3498db'
                }}>
                    <Left>
                        <Button styleName="clear" onPress={() => this.props.navigator.pop()}>
                            <Text
                                style={{
                                color: '#2980b9',
                                fontSize: 18
                            }}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title
                            style={{
                            color: 'white'
                        }}>{this.props.brandName}</Title>
                    </Body>
                    <Right></Right>
                </Header>

                <ListView
                    data={groupedData}
                    renderRow={this
                    .renderRow
                    .bind(this)}/>
            </Screen>

        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})