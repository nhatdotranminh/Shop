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
    Alert,

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
import firebaseApp from '../Help/firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window')
var Tonggia = 0;
var Total = 0;
var Demso = 0

var arr = [];

/* set biến tổng giá = 0 ,
 nếu ko có sản phẩm được chọn từ detail tổng giá vẫn bằng 0 
 ngược lại nếu có thì tính tổng giá sau đó cộng dồn tổng giá 
 để được biến tổng(tổng thành tiền sau khi đã cộng trừ thêm thuế và khuyến mãi )= Total
 Set state cho biến sum = total state sum thay đổi mỗi lần total thay đổi
 */

export default class Cart extends Component {
    constructor(props) {
        super(props)
        // state first
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            Sum: '',
            childkey: '',
            dem: '',

        }
         firebaseApp.database().ref('Cart/' + this.props.cartId + '/Trangthai/').set({
            Status: 'Chưa xử lí',
            Flag : 0
        })    
        // Các biến root 
        this.itemRef = this.getRef().child('Cart/' + this.props.cartId + '/Hanghoa/')
        this.valRef = this.getRef().child('Thamso/')
       // this.sttRef = this.getRef().child('Cart/' + this.props.cartId + '/Trangthai/')
        // Thêm trang thái vào mỗi giỏ hàng gồm các status và biến cờ hiệu
           
        // Tính tổng tiền + - thuế ..... tham số
        if (this.props.price == null) {
            Tonggia = 0;
        } else {
            Tonggia = this.props.price + (this.props.price * 0.1);
        }
        console.log('Cart ID la' + this.props.cartId)
        Total += Tonggia
        // bind
        this.navigate= this.navigate.bind(this)

    }
    // firebase config
    getRef() {
        return firebaseApp.database().ref();
    }
    navigate(routename, cartid, total) {
        this.props.navigator.push({
            id: routename,
            passProps: {
                cartId: cartid,
                Totalcharge: total
            }
        })

    }
    deleteProduct(CID, price) {
        // xoá sản phẩm được chọn trên firebase
        firebaseApp.database().ref('Cart/' + this.props.cartId + '/Hanghoa/' + CID).remove()
        // trừ tổng tiền cần thah toán set lại state 
        Total = Total - (price + (price * 10 / 100))
        this.setState({
            Sum: Total,
            dem: Demso
        })
    }

    componentWillMount() {
        // load thông tin giỏ hàng từ firebase
       
        this.itemRef.on('value', (snap) => {
            var count = snap.numChildren()
            snap.forEach((child) => {
                arr.push({ CID: child.key, name: child.val().ProductName, price: child.val().Price, image: child.val().Image })
            })
            // cho nay khong dung lam sua sau
            if(count == 0){
                Total = 0;
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(arr),
                Sum: Total,
                dem: count,

            
            })
            console.log(count)
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
                        <Text style={styles.proName}>
                            Đơn giá:  {property.price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VNĐ
                        </Text>
                    </View>
                    <View style={styles.deleteBtn}>
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
        // Nêu giỏ hàng trống load màn hình này
        if (Total == 0) {
            return (
                <Container>
                    <Header style={{ backgroundColor: '#34495e' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigator.pop()}>
                                <Text style={styles.iconStyle}>Back</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: 'white' }}>Giỏ hàng</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.navigate('Main', this.props.cartId, '')}>
                                <Icon style={styles.iconStyle} name='home' />
                            </Button>
                        </Right>
                    </Header>
                    <View style={styles.EmptyCart}>
                        <Text style={styles.name}>Giỏ hàng của bạn đang trống </Text>
                    </View>


                    <View style={styles.Tonggia}>
                        <Text style={{ fontSize: 20, fontWeigth: 'bold' }}>
                            Tổng số ước tính : {this.state.Sum} VNĐ
                        </Text>

                    </View>

                    <Footer>
                        <Button disabled>
                            <Text>TIẾN HÀNH THANH TOÁN</Text>
                        </Button>
                    </Footer>
                </Container>
            );
            // nếu giỏ hàng có hàng load màn hình này
        } else {
            return (
                <Container>
                    <Header style={{ backgroundColor: '#34495e' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigator.pop()}>
                                <Text style={styles.iconStyle}>Back</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: 'white' }}>Giỏ hàng({this.state.dem})</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.navigate('Main', this.props.cartId, '')}>
                                <Icon style={styles.iconStyle} name='home' />
                            </Button>
                        </Right>
                    </Header>
                    <View style={{ flex: 4.5 }}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)} />
                    </View>

                    <View style={styles.Tonggia}>

                        <Text style={{ fontSize: 20, fontWeigth: 'bold' }}>
                            Tổng số ước tính : {this.state.Sum.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VNĐ
                        </Text>
                        <Text style={{ color: 'gray', fontSize: 16 }}>Bao gồm VAT 10%</Text>
                    </View>

                    <Footer>
                        <Button  full success onPress={() => this.navigate('Pay', this.props.cartId, this.state.Sum)}>
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
    },
    deleteBtn: { flex: 0.5 },
    iconStyle: {
        color: '#2980b9', fontSize: 18
    }


})