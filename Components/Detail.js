import React, {Component} from 'react';
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
    Toast
} from 'native-base'
import {
    Icon,
    Button,
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
//

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uriImage: this.props.image,
            arr: [],
            newCartId: ''
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
                this.setState({arr: arrImg})
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
                    styleName='medium'/>
            </TouchableOpacity>
        )
    }
    chooseImage(image) {
        this.setState({uriImage: image})
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
    orderNavigate(routename, name, price, image, tonggiatri) {
        var date = new Date().toDateString()
        if (this.props.cartId != null) {
            let childId = this
                .getRef()
                .child('Cart/' + this.props.cartId + '/Hanghoa/')
                .push()
                .key;
            firebaseApp
                .database()
                .ref('/Cart/' + this.props.cartId + '/Hanghoa/' + childId)
                .update({ProductName: name, Price: price, Image: image, Ngaynhap: date});
            this
                .props
                .navigator
                .push({
                    id: routename,
                    passProps: {
                        cartId: this.props.cartId,
                        price: price,
                        Tonggiatri: tonggiatri
                    }
                })
            this.setState({newCartId: this.props.cartId})

        } else {
            var newPostKey = firebaseApp
                .database()
                .ref()
                .child('Cart')
                .push()
                .key;
            let Childkey = this
                .getRef()
                .child('/Cart/' + newPostKey + '/Hanghoa/')
                .push()
                .key;
            firebaseApp
                .database()
                .ref('/Cart/' + newPostKey + '/Hanghoa/' + Childkey)
                .set({ProductName: name, Price: price, Image: image, Ngaynhap: date});

            this
                .props
                .navigator
                .push({
                    id: routename,
                    passProps: {
                        cartId: newPostKey,
                        price: price,
                        Tonggiatri: tonggiatri
                    }
                })
            this.setState({newCartId: newPostKey})
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
                        <Button styleName='clear' onPress={() => this.props.navigator.pop()}>
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
                            styleName='clear'
                            onPress={() => this.navigate('Cart', this.state.newCartId, this.props.Tonggiatri)}>
                            <Icon
                                style={{
                                fontSize: 20
                            }}
                                name='cart'/>
                        </Button>
                    </Right>
                </Header>
                <View style={{
                    flex: 9
                }}>
                    <Tabs>
                        <Tab heading="Tổng quan">
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
                                    }}/>
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

                            </View>
                        </Tab>
                        <Tab heading="Chi tiết sản phẩm">
                            <View style={styles.ctContainer}>

                                <Title >Thông số kỹ thuật:
                                    <Subtitle>{this.props.Mieuta}</Subtitle>
                                </Title>

                                <Text style={styles.text}>Tình trạng: {this.props.tinhtrang}</Text>
                                <Text style={styles.text}>Bảo hành: {this.props.baohanh}</Text>
                                <Text style={styles.text}>Quà tặng: {this.props.khuyenmai}</Text>
                            </View>
                        </Tab>
                    </Tabs>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Button
                        styleName='full-width'
                        style={{
                        backgroundColor: '#2ecc71',
                        borderRadius: 10
                    }}
                        onPress={() => this.orderNavigate('Cart', this.props.productName, this.props.price, this.props.image)}>
                        <Icon
                            style={{
                            fontSize: 20
                        }}
                            name='add-to-cart'/>
                        <Text>ADD TO CART</Text>
                    </Button>
                </View>

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