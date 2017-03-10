import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Navigator,
    Image,
    StyleSheet
} from 'react-native';
import{
    Container, Header, Title, Button, Left, Right, Body, Footer, Tab,Tabs,Toast
} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
// import screen
//
import Cart from './Cart'

// firebase config
//
import firebaseApp from './firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window') 

var newPostKey =firebaseApp.ref().child('Cart').push().key; 
var arrImg=[]
//

export default class Detail extends Component{
    constructor(props){
        super(props)
        this.state={
            uriImage: this.props.image,
            arr:[],
            newCartId: newPostKey
            
        }      
        this.itemRef = this.getRef().child('Laptop/Brand/'+this.props.brandName+'/Products/'+ this.props.productName)
        this.viewDetailRef= this.getRef().child('Image/'+ this.props.productName)
        this.orderNavigate=this.orderNavigate.bind(this)
        this.chooseImage=this.chooseImage.bind(this)
    }
    getRef(){
        return firebaseApp.ref();
    }
    componentWillMount(){
        this.viewDetailRef.on('value', (snap)=>{
            var count = snap.numChildren()
            for(i =1; i< count; i++){
                var detailImage=this.viewDetailRef.child('image'+i)
                detailImage.on('value', (datasnap)=>{
                    arrImg.push({image: datasnap.val()})
                })
            }
            this.setState({
                arr: arrImg
            })
            arrImg = []
        })
    }
    renderRow(properties){
        return(
              <TouchableOpacity style={styles.card}
                onPress = {() => this.chooseImage(properties.image)} >
                 <Image source={{uri: properties.image}} style={styles.img} />
              </TouchableOpacity>
        )
    }
    chooseImage(image){
        this.setState({
            uriImage: image
        })
    }
    navigate(routename, cartId){
        this.props.navigator.push({
            id: routename,
            passProps:{
                cartId: cartId,
            }
        })
    }
    orderNavigate(routename, name, price , image, cartId){
        var date = new Date().toDateString()
        if(this.props.cartId === this.state.newCartId){
            let childId =firebaseApp.ref().child('Cart/'+ this.props.cartId).push().key;
            firebaseApp.ref('/Cart/' + this.props.cartId +'/'+childId).update({
            ProductName:name,
            Price: price,
            Image: image,
            Ngaynhap: date
            });
        }else{
            var Childkey= firebaseApp.ref().child('Cart/'+ newPostKey).push().key;
            firebaseApp.ref('/Cart/' + newPostKey+'/'+Childkey).set({
            ProductName:name,
            Price: price,
            Image: image,
            Ngaynhap: date
            });
         }
       console.log('Detail'+this.state.newCartId)
       
       
        this.props.navigator.push({
            id:routename,
            passProps:{
                cartId: cartId,
                price: price
            }
        }) 
         Toast.show({
              text: 'Thêm vào giỏ hàng thành công',
              position: 'bottom',
              buttonText: 'Okay'
             
            })
        
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
                        <Button transparent onPress={()=> this.navigate('Cart', this.state.newCartId)}>
                             <Icon style={{fontSize: 20}}name='shopping-cart'/>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.mainContainer}>
                    <Tabs>
                         <Tab heading="Tổng quan">
                             <View style={styles.tongquancontainer}>
                                     <View style={styles.nameAndPriceCon}>
                                        <Text style={styles.productNameText}>
                                            {this.props.productName}
                                        </Text>
                                        <Text style={styles.price}>
                                            {this.props.price} VNĐ
                                        </Text>    
                                    </View>                                    
                                    <View style={styles.imgContainer}>
                                         <Image style={styles.productImg} source={{uri: this.state.uriImage}}/>
                                    </View>
                                    <View style={styles.imageList}>
                                        <ScrollView
                                            horizontal={true}
                                            automaticallyAdjustContentInsets={false}
                                            style={[styles.scrollView, styles.horizontalScrollView]} >
                                            {this.state.arr.map(this.renderRow.bind(this))}
                                        </ScrollView>
                                    </View>
                                     
                             </View>
                         </Tab>
                         <Tab heading="Chi tiết sản phẩm">
                             <View style={styles.ctContainer}>
                                <Text style={styles.text}>Thông số kỹ thuật:{this.props.Mieuta}</Text>
                                <Text style={styles.text}>Tình trạng: {this.props.tinhtrang}</Text>
                                <Text style={styles.text}>Bảo hành: {this.props.baohanh}</Text>
                                <Text style={styles.text}>Quà tặng: {this.props.khuyenmai}</Text>
                             </View>
                         </Tab>
                    </Tabs>

                </View>
                <Footer>
                    <Button style={{backgroundColor:'#2ecc71'}} onPress={()=> this.orderNavigate('Cart',this.props.productName,this.props.price, this.props.image, this.state.newCartId)}>
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
        
        flex: 1
    },
    tongquancontainer:{
        justifyContent:'center',
        alignItems:'center',
        flex: 1
    },
    nameAndPriceCon:{
        flex: 1
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
    productImg:{
        width: deviceScreen.height/2,
        height: deviceScreen.height/2-30,
        resizeMode:'contain',
        
    },
    ctContainer:{
        flex: 1,
        margin: 10
    },
    text:{
        fontSize: 20
    },
    card:{
        paddingTop: 10,
        alignItems:'center',
        borderRadius: 3
    },
    img:{
        height: deviceScreen.height/6 -20,
        width: deviceScreen.height/6 -20
    },
    imgContainer:{
        flex: 2.5,
        justifyContent:'center',
        alignItems:'center'
    },
    scrollView:{height: deviceScreen.height/6},
    horizontalScrollView:{height: 120},
    imageList:{flex: 2, backgroundColor:'white'},

});