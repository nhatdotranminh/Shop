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
    Container, Header, Title, Button, Left, Right, Body, Footer
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
var Tonggia= 0;
var arr=[];

//

export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2 }),
            Sum: ''
        }      
        this.itemRef = this.getRef().child('Cart/'+this.props.cartId)
        Tonggia=this.props.price+(this.props.price * 10/100);
        console.log('Cart ID la'+this.props.cartId)
        
       
    }
    getRef(){
        return firebaseApp.ref();
    }
    navigate(routename, cartid){
        this.props.navigator.push({
            id: routename,
            passProps:{
                _cartkey: cartid
            }
        })
        
    }
    componentWillMount(){
       this.itemRef.on('value', (snap)=>{
         snap.forEach((child)=>{
          arr.push({CID: child.key , name: child.val().ProductName,price:child.val().Price ,image: child.val().Image})
       })
       
        this.setState({
           dataSource: this.state.dataSource.cloneWithRows(arr),
            Sum: Tonggia
            
        })
        Tonggia= 0;
        arr=[]
     })
    }
    renderRow(property){
        console.log('Ten sp'+property.name)
       
        return(
            <View style={styles.productContainer}>
                <View style={styles.nameView}>
                    <Text style={styles.name}> {property.name}</Text>
                    
                </View>
                <View style={styles.productView}>
                    <View style={styles.imgView}>
                        <Image source={{uri: property.image}} style={styles.img}/>
                    </View>
                    <View style={styles.priceView}>
                        <Text style={styles.proName}>{property.price}</Text>
                    </View>
                </View>
            </View>
           
        )
    }
    
    render(){
        return(
             <Container>
                <Header style={{backgroundColor:'#e67e22'}}>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigator.pop({passProps:{_cKey:this.props.cartid}})}>
                            <Icon style={{fontSize: 20}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Giỏ hàng</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=> this.navigate('Main', this.props.cartid)}>
                             <Icon style={{fontSize: 20}}name='home'/>
                        </Button>
                    </Right>
                </Header>
               
                 <ListView 
                  dataSource = {this.state.dataSource}
                  renderRow = {this.renderRow.bind(this)} />
              
                  <View style={styles.Tonggia}>
                     <Text>Tong tien thanh toan : {this.state.Sum}</Text>
                  </View>
               
                <Footer>
                        <Button >
                            <Text>Submit</Text>
                        </Button>
                    </Footer>
            </Container>
                
                
               
           
        );
     }
}
  const styles=StyleSheet.create({
    mainContainer:{
        flex: 1,
        //backgroundColor:'green'
    },
    productContainer:{
        margin: 5,
        width: deviceScreen.width-5,
        height: deviceScreen.height/5-20,
        borderWidth: 0.5,
        borderColor:'black',
       // backgroundColor:'yellow'
    },
    productView:{
        flex:3,
        //borderWidth:5,
        flexDirection:'row'
    },
    imgView:{
        flex: 1,
      //  backgroundColor:'green'
    },
    img:{
         width: deviceScreen.width/2-20,
          height: deviceScreen.height/6-40,
          resizeMode:'contain'

    },
    priceView:{
        flex: 1,
        //backgroundColor:'red'
    },
    nameView:{
        flex:1,
       
    },
    proName:{
        fontSize: 16,
        marginLeft: 10
    },
    none:{
        flex:1,
       // backgroundColor:'green'
    },
    Tonggia:{
        flex:1,
       // backgroundColor:'red',
       marginLeft: 10
    },
   
    
  })