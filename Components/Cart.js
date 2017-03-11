import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ListView,
    Navigator,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
import {
    Container, Header, Title, Button, Left, Right, Body, Footer
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
// import screen
//
import Pay from './Pay'
// firebase config
//
import firebaseApp from './firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window')
var Tonggia = 0;
var Total = 0;
var Demso = 0

var arr = [];

//

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            Sum: '',
            childkey: '',
            dem: ''
        }
        this.itemRef = this.getRef().child('Cart/' + this.props.cartId)
        this.valRef = this.getRef().child('Thamso/')


        if (this.props.price == null) {
            Tonggia = 0;
        } else {
            Tonggia = this.props.price + (this.props.price * 0.1);
        }
        console.log('Cart ID la' + this.props.cartId)
        Total += Tonggia

    }
    getRef() {
        return firebaseApp.ref();
    }
    navigate(routename, cartid) {
        this.props.navigator.push({
            id: routename,
            passProps: {
                cartId: cartid
            }
        })

    }
    payNavigate(routeid, tong) {
        this.props.navigator.push({
            id: routeid,
            passProps: {
                Tongthanhtoan: tong
            }
        })

    }
    deleteProduct(CID, price) {
        firebaseApp.ref('Cart/' + this.props.cartId + '/' + CID).remove()

        Total = Total - (price + (price * 10 / 100))
        this.setState({
            Sum: Total,
            dem: Demso
        })
    }

    componentWillMount() {
        this.itemRef.on('value', (snap) => {
            var count = snap.numChildren()
            snap.forEach((child) => {
                arr.push({ CID: child.key, name: child.val().ProductName, price: child.val().Price, image: child.val().Image })
            })
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(arr),
                Sum: Total,
                dem: count

            })
            Demso = count
            Tonggia = 0;
            arr = []
        })
    }

    renderRow(property) {
        return (
            <View style={styles.productContainer}>
                <View style={styles.nameView}>
                    <Text style={styles.name}> {property.name}</Text>

                </View>
                <View style={styles.productView} >
                    <View style={styles.imgView}>
                        <Image source={{ uri: property.image }} style={styles.img} />
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.proName}>Đơn giá: {property.price.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} VNĐ</Text>
                        <Button transparent onPress={() => Alert.alert(
                            'Xoá Sản phẩm khỏi giỏ hàng',
                            'Bạn có muốn xoá sản phẩm ' + property.name + ' khỏi giỏ hàng',
                            [
                                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                { text: 'OK', onPress: () => this.deleteProduct(property.CID, property.price) },
                            ],
                            { cancelable: false }
                        )}>
                            <Icon style={{ fontSize: 20 }} name='delete' />
                        </Button>
                    </View>
                </View>
            </View>

        )

    }

    render() {
        console.log(this.state.Sum)
        console.log('Tong giá' + Total)
        if (Total == 0) {
            return (
                <Container>
                    <Header style={{ backgroundColor: '#e67e22' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigator.pop()}>
                                <Icon style={{ fontSize: 20 }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Giỏ hàng </Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.navigate('Main', this.props.cartId)}>
                                <Icon style={{ fontSize: 20 }} name='home' />
                            </Button>
                        </Right>
                    </Header>
                    <View style={styles.EmptyCart}>
                        <Text style={styles.name}>Giỏ hàng của bạn đang trống </Text>
                    </View>


                    <View style={styles.Tonggia}>
                        <Text style={{ fontSize: 20, fontWeigth: 'bold' }}>Tổng số ước tính : {this.state.Sum} VNĐ</Text>

                    </View>

                    <Footer>
                        <Button disabled>
                            <Text>TIẾN HÀNH THANH TOÁN</Text>
                        </Button>
                    </Footer>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Header style={{ backgroundColor: '#e67e22' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigator.pop()}>
                                <Icon style={{ fontSize: 20 }} name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Giỏ hàng({this.state.dem})</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.navigate('Main', this.props.cartId)}>
                                <Icon style={{ fontSize: 20 }} name='home' />
                            </Button>
                        </Right>
                    </Header>
                    <View style={{ flex: 4.5 }}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)} />
                    </View>

                    <View style={styles.Tonggia}>

                        <Text style={{ fontSize: 20, fontWeigth: 'bold' }}>Tổng số ước tính : {this.state.Sum} VNĐ</Text>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Bao gồm VAT 10%</Text>
                    </View>

                    <Footer>
                        <Button full success onPress={() => this.payNavigate('Pay', this.state.Sum)}>
                            <Text>TIẾN HÀNH THANH TOÁN</Text>
                        </Button>
                    </Footer>
                </Container>

            );
        }
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor:'green'
    },
    productContainer: {
        margin: 5,
        width: deviceScreen.width - 5,
        height: deviceScreen.height / 5 - 20,
        borderWidth: 0.5,
        borderColor: 'black',
        // backgroundColor:'yellow'
    },
    productView: {
        flex: 3,
        //borderWidth:5,
        flexDirection: 'row'
    },
    imgView: {
        flex: 1,
        //  backgroundColor:'green'
    },
    img: {
        width: deviceScreen.width / 2 - 20,
        height: deviceScreen.height / 6 - 40,
        resizeMode: 'contain'

    },
    priceView: {
        flex: 1,
        //backgroundColor:'red'
    },
    nameView: {
        flex: 1,
        marginLeft: 15

    },
    name: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',


    },
    proName: {
        fontSize: 16,
        marginLeft: 10
    },
    none: {
        flex: 1,
        // backgroundColor:'green'
    },
    Tonggia: {
        flex: 0.5,
        // backgroundColor:'red',
        marginLeft: 10,
        justifyContent: 'flex-end'
    },
    EmptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})