import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { Container, Content, Tab, Tabs, Button, List, ListItem, Toast } from 'native-base';
import firebaseApp from '../Help/firebase'

var deviceScreen = Dimensions.get('window')
var array = [];
var arrInfor = [];
export default class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Dem: 0,
            idGioHang: ""
        }
        this.statusRef = this
            .getRef()
            .child('Cart')
    }
    getRef() {
        return firebaseApp
            .database()
            .ref();
    }
    _deleteUndefinedCart() {
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
                if (array[i].flag != 1) {
                    firebaseApp.database().ref('Cart/' + array[i].CartId).remove()
                    console.log(array[i].flag)
                } else {

                }
            }

        })

    }
    _seeInfor() {
        if (this.state.idGioHang == "") {
            Toast.show({
                type: 'danger',
                text: 'Mã đơn hàng sai',
                position: 'bottom',
                duration: 2000
            })
        } else {
            const events = this
                .getRef().child('Inforcustomer')
         // const query = events.orderByChild('key').equalTo(this.state.idGioHang)
               .on('value', (snap) => {
                snap.forEach((child) => {
                    arrInfor.push({
                        ID: child.key,
                        diachi: child.val().ADDRESS,
                        diachigiao: child.val().DeliveryAddress,
                        name: child.val().FULLNAME,
                        date: child.val().NGAYORDER,
                        idCart: child.val().CartId,
                        phone: child.val().PHONE,
                        Total: child.val().TONGTIEN,
                        UID: child.val().UID

                    })
                })
            })
        }
      
    }
    render() {
        return (
            <Container style={{ paddingTop: 10 }}>
                <Tabs>
                    <Tab heading="Thông tin đơn đặt hàng">
                        <Content>
                            <TextInput
                                placeholder='Nhập mã đơn hàng'
                                onChangeText={(text) => this.setState({ idGioHang: text })}
                                style={styles.textInput}
                                value={this.state.idGioHang}
                                placeholderTextColor='gray'
                                autoCorrect={false}
                                autoFocus={true} />
                            <Button full success onPress={() => this._seeInfor()}><Text>Xem Thông Tin Đơn Hàng</Text></Button>
                            <List>
                                <ListItem itemDivider>
                                    <Text>Thông tin khách hàng: {arrInfor.name}</Text>
                                </ListItem>
                            </List>
                        </Content>
                    </Tab>
                    <Tab heading="Quản lí Shop">
                        <Content>
                            <Button full danger onPress={() => this._deleteUndefinedCart()}><Text>Clean Undefined Cart</Text></Button>
                        </Content>
                    </Tab>

                </Tabs>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
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