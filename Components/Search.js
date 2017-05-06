import React, { Component } from 'react';
import {
    View,

    ListView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Content,
    Title,
    Text,
    InputGroup,
    Input,
    Toast
} from 'native-base';
import firebaseApp from '../Help/firebase';
const db = firebaseApp.database();

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            count_product: [],
            txtSearch: ""
        }
    }
    _searchProduct(){
    if(this.state.txtSearch === ""){
      Toast.show({
        type: 'danger',
        text: 'Vui lòng nhập tên sản phẩm cần tìm',
        position: 'bottom',
        duration: 2000
      })
    }else{
      const events = db.child('Laptop/Brand/')
      const query= events.orderByChild('brandName').equalTo(this.state.txtSearch)
      query.on('value', (snap) =>{
          
      })
    }
  }
    render() {
        return (
            <Container>
                <Header noShadow={true} style={{ height: 50 }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigator.pop()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tìm kiếm</Title>
                    </Body>
                </Header>
                <Content>
                    <InputGroup style={{ backgroundColor: '#FFF' }}>
                        <Input
                            placeholder='Nhập tên sản phẩm'
                            onChangeText={(txtSearch) => this.setState({ txtSearch })}
                            value={this.state.txtSearch}
                        />
                        <Button transparent onPress={() => this._searchProduct()}>
                            <Icon name='md-search' />
                        </Button>
                    </InputGroup>
                    <ListView
                        dataSource={this.state.products}
                        renderRow={this._renderRow.bind(this)}
                        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                        pageSize={this.state.products.lenght}
                    />
                </Content>
            </Container>
        )
    }
}
