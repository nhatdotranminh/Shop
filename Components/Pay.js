import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    Alert
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Picker,
    Content,
    Toast
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
//
//Fire base
import firebaseApp from '../Help/firebase';
//
//
var deviceScreen = Dimensions.get('window')
const Item = Picker.Item
var newOrderPostkey = firebaseApp
    .database()
    .ref()
    .child('Inforcustomer')
    .push()
    .key;
var array = [];
//
var Tongtien = 0;

export default class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key1',
            results: {
                items: []
            },
            fullname: '',
            email: '',
            address: '',
            phone: '',
            deliveryAddress: '',
            codeKm: '',
            Dem: '',
            Total: this.props.Totalcharge
        }
        Tongtien = this.props.Totalcharge
        this.statusRef = this
            .getRef()
            .child('Cart')
        this.submitinfo= this.submitinfo.bind(this)
    }
    onValueChange(value) {
        this.setState({ selected1: value });
    }
    getRef() {
        return firebaseApp
            .database()
            .ref();
    }

    submitinfo(name, email, address, phone, totalcharge, cartID, deliveryadd) {
        if (name == '' || address == '' || phone == '' || email == '') {
            Alert.alert('Thông báo', 'Bạn chưa nhập thông tin. Vui lòng điền đầy đủ thông tin để xác nhận mua hàng', [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }
            ], { cancelable: false })
        } else {
            var date = new Date().toDateString()
            firebaseApp
                .database()
                .ref('Inforcustomer/' + newOrderPostkey)
                .set({
                    UID: '',
                    CartID: cartID,
                    FULLNAME: name,
                    EMAIL: email,
                    ADDRESS: address,
                    DeliveryAddress: deliveryadd,
                    PHONE: phone,
                    NGAYORDER: date,
                    TONGTIEN: totalcharge
                })
            firebaseApp
                .database()
                .ref('Cart/' + this.props.cartId + '/Trangthai/')
                .update({
                    Status: 'Đã xác nhận',
                    Flag: 1
                })
            Toast.show({ text: 'Thành công vui lòng kiểm tra Email', position: 'bottom', buttonText: 'Okay' })
        }
        this.props.navigator.push({
            id: 'Main',
            passProps: {
                cartId: firebaseApp.database().ref().child('Cart').push().key
            }
        })

    }
    /* code logic dùng lúc bảo trì hệ thống
    componentDidMount() {
        this.statusRef.on('value', (snap) => {
            var count = snap.numChildren()
            for (i = 1; i < count; i++) {
                snap.forEach((child) => {
                    array.push({
                        CartId: child.key,
                        trangthai: child
                            .val()
                            .Trangthai
                            .Status,
                        flag: child
                            .val()
                            .Trangthai
                            .Flag,
                    })
                })
            }
            this.setState({ Dem: count })
            console.log(this.state.Dem)
            for (i = 0; i < this.state.Dem; i++) {
                if (array[i].flag == 0) {
                    firebaseApp.database().ref('Cart/' + array[i].CartId).remove()

                } else {
                    console.log(array[i].trangthai)
                    console.log(array[i].CartId)
                }
            }

        })

        this.statusRef.on('value', (snap) => {
            var dem = snap.numChildren()
            console.log('Giỏ hiện tại' + dem)

        })
    }*/

    render() {
        return (
            <Container>

                <Header
                    style={{
                        backgroundColor: '#34495e'
                    }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigator.pop()}>
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
                            }}>Thanh toán</Title>
                    </Body>
                    <Right></Right>
                </Header>

                <Content>
                    <View style={styles.pick}>
                        <Text style={styles.text}>Chọn cách thanh toán:
                        </Text>
                        <Picker //iosHeader="Select one"
                            mode="dialog" selectedValue={this.state.selected1} onValueChange={this
                                .onValueChange
                                .bind(this)}>
                            <Item label="Wallet" value="key0" />
                            <Item label="ATM Card" value="key1" />
                            <Item label="Debit Card" value="key2" />
                            <Item label="Credit Card" value="key3" />
                            <Item label="Net Banking" value="key4" />
                        </Picker>

                    </View>
                    <TextInput
                        placeholder='Full name'
                        onChangeText={(text) => this.setState({ fullname: text })}
                        style={styles.textInput}
                        value={this.state.fullname}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        autoFocus={true} />
                    <TextInput
                        placeholder='Email'
                        onChangeText={(text) => this.setState({ email: text })}
                        style={styles.textInput}
                        value={this.state.email}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        keyboardType='email-address'
                        autoCapitalize='sentences' />
                    <TextInput
                        placeholder='Địa chỉ'
                        onChangeText={(text) => this.setState({ address: text })}
                        style={styles.textInput}
                        value={this.state.address}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        autoCapitalize='sentences' />
                    <TextInput
                        placeholder='Địa chỉ giao hàng'
                        onChangeText={(text) => this.setState({ deliveryAddress: text })}
                        style={styles.textInput}
                        value={this.state.deliveryAddress}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        autoCapitalize='sentences' />
                    <TextInput
                        placeholder='Your phone number'
                        onChangeText={(text) => this.setState({ phone: text })}
                        style={styles.textInput}
                        value={this.state.phone}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        autoCapitalize='sentences' />


                    <Text
                        style={{
                            fontSize: 18,
                            margin: 10
                        }}>Tổng tiền : {this.state.Total}
                        VNĐ</Text>
                    <Button
                        full
                        success
                        onPress={() => this.submitinfo(this.state.fullname, this.state.email, this.state.address, this.state.phone, this.state.Total, this.props.cartId, this.state.deliveryAddress)}>
                        <Text>
                            Xác nhận
                        </Text>
                    </Button>
                </Content>

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    pick: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'

    },
    text: {
        fontSize: 16,
        padding: 10
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: deviceScreen.width - 20,
        padding: 10,
        margin: 10
    }
})