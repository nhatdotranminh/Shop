import React,{Component} from 'react';
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
import{
    Container, Header, Title, Button, Left, Right, Body, Footer, Tab,Tabs
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
// import screen
//
// firebase config
//
import firebaseApp from './firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window')
var detail= [];
//

export default class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2 })
        }      
        this.itemRef = this.getRef().child('Laptop/Brand/'+this.props.brandName+'/Products/'+ this.props.productName)
    }
    getRef(){
        return firebaseApp.ref();
    }
    render(){
        return(
             <Container>
                <Header style={{backgroundColor:'#e67e22'}}>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigator.pop()}>
                            <Icon style={{fontSize: 20}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                    <Right>
                        <Button transparent>
                             <Icon style={{fontSize: 20}}name='shopping-cart'/>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.mainContainer}>
                    <Tabs>
                         <Tab heading="Tổng quan">
                             <View style={styles.tongquancontainer}>
                                 <View>
                                    <Text style={styles.productNameText}>
                                        {this.props.productName}
                                    </Text>
                                    <Text style={styles.price}>
                                        {this.props.price} VNĐ
                                    </Text>
                                    <Image style={styles.Img} source={{uri: this.props.image}}/>
                                     
                                 </View>
                               
                             </View>
                         </Tab>
                         <Tab heading="Chi tiết sản phẩm">
                             <View style={styles.ctContainer}>
                                <Text style={styles.mieutaText}>Thông số kỹ thuật:{this.props.Mieuta}</Text>
                                <Text style={styles.tinhtrangText}>Tình trạng: {this.props.tinhtrang}</Text>
                                <Text style={styles.baohanhTextt}>Bảo hành: {this.props.baohanh}</Text>
                                <Text style={styles.quatangText}>Quà tặng: {this.props.khuyenmai}</Text>
                             </View>
                         </Tab>
                    </Tabs>

                </View>
                <Footer>
                    <Button style={{backgroundColor:'#2ecc71'}}>
                        <Icon style={{fontSize: 20}} name='add-shopping-cart'/>
                        <Text>ADD TO CART</Text>
                    </Button>
                </Footer>
            </Container>
        );

    }
}
const styles=StyleSheet.create({
    mainContainer:{
        flexDirection:'column',
        flex: 9
    },
    tongquancontainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'#2ecc71'
    },
    productNameText:{
        fontSize: 24,
        color:'#e67e22'
    },
    price:{
        fontSize: 30
    },
    Img:{
        width:deviceScreen.height/4,
        height: deviceScreen.height/4+30,
        resizeMode:'contain'
    },
    ctContainer:{
        flex: 1,
        margin: 10
    }


});