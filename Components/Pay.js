import React, { Component } from 'react';
import {
    Text, View, StyleSheet, Dimensions, TextInput, Alert
} from 'react-native';
import {
    Container, Header, Title, Button, Left, Right, Body, Picker, Content
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
//
//Fire base
import firebaseApp from '../Help/firebase';
//
//
var deviceScreen = Dimensions.get('window')
const Item = Picker.Item
var newOrderPostkey = firebaseApp.database().ref().child('Inforcustomer').push().key;
//

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
        }
    }
    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }
    submitinfo(name, email, address, phone, totalcharge, cartID) {
        if (name == '' || address == '' || phone == '' || address == '') {
            Alert.alert(
                'Thông báo',
                'Bạn chưa nhập thông tin. Vui lòng điền đầy đủ thông tin để xác nhận mua hàng',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        } else {
            var date = new Date().toDateString()
            firebaseApp.database().ref('Inforcustomer/' + newOrderPostkey).set({
                UID: '',
                CartID: cartID,
                FULLNAME: name,
                EMAIL: email,
                ADDRESS: address,
                PHONE: phone,
                NGAYORDER: date,
                TONGTIEN: totalcharge
            })
            firebaseApp.database().ref('Cart/' + this.props.cartId + '/Trangthai/').update({
                Status: 'Đã xác nhận'
            })
            Toast.show({
                text: 'Thanh toán thành công vui lòng kiểm tra Email',
                position: 'bottom',
                buttonText: 'Okay'

            })
        }

    }

    render() {
        return (
            <Container>

                <Header style={{ backgroundColor: '#34495e' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigator.pop()}>
                            <Text style={{ color: '#2980b9', fontSize: 18 }}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: 'white' }}>Thanh toán</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>

                <Content>
                    <View style={styles.pick}>
                        <Text style={styles.text}>Chọn cách thanh toán:  </Text>
                        <Picker
                            //iosHeader="Select one"
                            mode="dialog"
                            selectedValue={this.state.selected1}
                            onValueChange={this.onValueChange.bind(this)}>
                            <Item label="Wallet" value="key0" />
                            <Item label="ATM Card" value="key1" />
                            <Item label="Debit Card" value="key2" />
                            <Item label="Credit Card" value="key3" />
                            <Item label="Net Banking" value="key4" />
                        </Picker>

                    </View>
                    <TextInput placeholder='Full name'
                        onChangeText={(text) => this.setState({ fullname: text })}
                        style={styles.textInput}
                        value={this.state.fullname}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        autoFocus={true}


                    />
                    <TextInput placeholder='Email'
                        onChangeText={(text) => this.setState({ email: text })}
                        style={styles.textInput}
                        value={this.state.email}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        keyboardType='email-address'
                        autoCapitalize='sentences'

                    />
                    <TextInput placeholder='Địa chỉ'
                        onChangeText={(text) => this.setState({ address: text })}
                        style={styles.textInput}
                        value={this.state.address}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        autoCapitalize='sentences'

                    />
                    <TextInput placeholder='Your phone number'
                        onChangeText={(text) => this.setState({ phone: text })}
                        style={styles.textInput}
                        value={this.state.phone}
                        placeholderTextColor='gray'
                        autoCorrect={false}
                        keyboardType='phone-pad'
                        autoCapitalize='sentences'

                    />
                    <Button full success onPress={() => this.submitinfo(this.state.fullname, this.state.email, this.state.address, this.state.phone, this.props.Totalcharge, this.props.cartId)}>
                        <Text> Xác nhận </Text>
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
        height: 40, borderColor: 'gray', borderWidth: 1,
        width: deviceScreen.width - 20,
        padding: 10,
        margin: 10
    },

})