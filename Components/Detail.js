import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,

    Navigator,

    StyleSheet
} from 'react-native';
import {
    Header,
    Left,
    Right,
    Body,
    Footer,
    Tab,
    Tabs,
    Toast,
    Button,
} from 'native-base'
import {
    Icon,
    
    Screen,
    ScrollView,
    Image,
    Subtitle,
    Title
} from '@shoutem/ui'

// import screen
//
import Cart from './Cart'

// firebase config
//
import firebaseApp from '../Help/firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window')
// tạo Mã mới cho 1 phiên làm việc với giỏ hàng mảng lưu ảnh chi tiết sản phẩm
var arrImg = []
var newKey = firebaseApp.database().ref()
    .child('Cart')
    .push()
    .key;
//

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uriImage: this.props.image,
            arr: [],
            newCartId: newKey
        }

        // query firebase
        this.itemRef = this
            .getRef()
            .child('Laptop/Brand/' + this.props.brandName + '/Products/' + this.props.productName)
        this.viewDetailRef = this
            .getRef()
            .child('Image/' + this.props.productName)
        this.orderNavigate = this
            .orderNavigate
            .bind(this)
        this.chooseImage = this
            .chooseImage
            .bind(this)
        console.log("details ID " + this.props.cartId)
    }
    getRef() {
        return firebaseApp
            .database()
            .ref();
    }
    componentWillMount() {
        // load ảnh từ firebase về và gán vào mảng ảnh arrimg sau đó set state arr
        console.log("products id " + this.props.cartId)
        this
            .viewDetailRef
            .on('value', (snap) => {
                var count = snap.numChildren()
                for (i = 1; i < count; i++) {
                    var detailImage = this
                        .viewDetailRef
                        .child('image' + i)
                    detailImage.on('value', (datasnap) => {
                        arrImg.push({
                            image: datasnap.val()
                        })
                    })
                }
                this.setState({ arr: arrImg })
                arrImg = []
            })
    }
    renderRow(properties) {
        // thay đổi hình ảnh
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => this.chooseImage(properties.image)}>
                <Image
                    source={{
                        uri: properties.image
                    }}
                    styleName='medium' />
            </TouchableOpacity>
        )
    }
    chooseImage(image) {
        this.setState({ uriImage: image })
    }
    //
    navigate(routename, cartId) {
        this
            .props
            .navigator
            .push({
                id: routename,
                passProps: {
                    cartId: cartId
                }
            })
    }
    orderNavigate(routename, name, price, image, cartid) {
        var date = new Date().toDateString()
        if (this.props.cartId === this.state.newCartId) {
            let childId = this
                .getRef()
                .child('Cart/' + this.props.cartId + '/Hanghoa/')
                .push()
                .key;
            firebaseApp
                .database()
                .ref('/Cart/' + this.props.cartId + '/Hanghoa/' + childId)
                .update({ ProductName: name, Price: price, Image: image, Ngaynhap: date });
            this
                .props
                .navigator
                .push({
                    id: routename,
                    passProps: {
                        cartId: cartid,
                        price: price
                    }
                })
        } else {
            var Childkey = this
                .getRef()
                .child('Cart/' + newKey + '/Hanghoa')
                .push()
                .key;
            firebaseApp
                .database()
                .ref('/Cart/' + newKey + '/Hanghoa/' + Childkey)
                .set({ ProductName: name, Price: price, Image: image, Ngaynhap: date });
            this
                .props
                .navigator
                .push({
                    id: routename,
                    passProps: {
                        cartId: cartid,
                        price: price
                    }
                })

        }
    }

    render() {
        return (
            <Screen>
                <Header
                    style={{
                        backgroundColor: '#3498db'
                    }}>
                    <Left>
                        <Button light transparent onPress={() => this.props.navigator.pop()}>
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
                    <Right>
                        <Button
                            light transparent
                            onPress={() => this.navigate('Cart', this.state.newCartId, )}>
                            <Icon
                                style={{
                                    fontSize: 20
                                }}
                                name='cart' />
                        </Button>
                    </Right>
                </Header>
                <ScrollView style={{
                    flex: 9
                }}>

                    <View style={styles.tongquancontainer}>
                        <View style={styles.nameAndPriceCon}>
                            <Text style={styles.productNameText}>
                                {this.props.productName}
                            </Text>
                            <Text style={styles.price}>
                                {this
                                    .props
                                    .price
                                    .toString()
                                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                VNĐ
                                    </Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image
                                styleName='large-wide'
                                source={{
                                    uri: this.state.uriImage
                                }} />
                        </View>
                        <View style={styles.imageList}>
                            <ScrollView
                                horizontal={true}
                                automaticallyAdjustContentInsets={false}
                                style={[styles.scrollView, styles.horizontalScrollView]}>
                                {this
                                    .state
                                    .arr
                                    .map(this.renderRow.bind(this))}
                            </ScrollView>
                        </View>
                        <View style={styles.ctContainer}>

                            <Title >Thông số kỹ thuật:
                                    <Subtitle>{this.props.Mieuta}</Subtitle>
                            </Title>

                            <Text style={styles.text}>Tình trạng: {this.props.tinhtrang}</Text>
                            <Text style={styles.text}>Bảo hành: {this.props.baohanh}</Text>
                            <Text style={styles.text}>Quà tặng: {this.props.khuyenmai}</Text>
                        </View>

                    </View>


                </ScrollView>
                
                    <Button
                        full success
                        onPress={() => this.orderNavigate('Cart', this.props.productName, this.props.price, this.props.image, this.state.newCartId)}>
                        <Icon
                            style={{
                                fontSize: 20
                            }}
                            name='add-to-cart' />
                        <Text>ADD TO CART</Text>
                    </Button>
               

            </Screen>
        );

    }
}
const styles = StyleSheet.create({
    mainContainer: {

        flex: 1
    },
    tongquancontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    nameAndPriceCon: {
        flex: 1
    },
    imgContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageList: {
        flex: 2,
        backgroundColor: '#ecf0f1'
    },
    price: {
        fontSize: 24
    },

    productNameText: {
        fontSize: 24,
        color: '#e67e22',
        margin: 1

    },

    ctContainer: {
        flex: 1,
        margin: 10
    },
    text: {
        fontSize: 20
    },
    card: {
        paddingTop: 10,
        alignItems: 'center',
        borderRadius: 3
    },
    img: {
        height: deviceScreen.height / 6 - 20,
        width: deviceScreen.height / 6 - 20
    },

    scrollView: {
        height: deviceScreen.height / 6
    },
    horizontalScrollView: {
        height: 120
    }
});