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
   Container, Header, Title, Button, Left, Right, Body, Icon
} from 'native-base'

// import screen
//
import Detail from './Detail'
// firebase config
//
import firebaseApp from './firebase';
//
//
// bien
var deviceScreen = Dimensions.get('window')
var product =[]
//
// main
export default class LaptopProducts extends Component{
    constructor(props){
        super(props)
        this.state ={
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 })
        }
        this.itemsRef = this.getRef().child('Laptop/Brand/'+this.props.brandName+'/Products');
    }
    getRef() {
     return firebaseApp.ref();
    }
    componentWillMount(){
        this.itemsRef.on('value',(snap) => {
            snap.forEach((child)=> {
                product.push({name: child.key, price: child.val().Price, color: child.val().Color,
                           image:child.val().Image, Des: child.val().Mieuta,
                              tinhtrang: child.val().Tinhtrang, baohanh: child.val().BaoHanh, khuyenmai: child.val().Khuyenmai })
            })
           
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(product)

            })
             product =[]
             
        })
       
    }
    renderRow(Products){
        console.log(Products.name)
        return(
			<View style={styles.row}>
				<View style={styles.square}>
					<TouchableOpacity style={styles.productImage} onPress={()=> this.navigate('Detail', Products.name,
                        Products.price, Products.color, Products.image, Products.Des, Products.tinhtrang, Products.baohanh, Products.khuyenmai)}>
						<Image style={styles.image} source={{uri: Products.image}}/>
					</TouchableOpacity>
					<View style={styles.nameView}>
						<Text style={styles.nameText}>{Products.name}</Text>
					</View>
				</View>
			</View>
		)
    }
    navigate(routename, name, price, color, image, Des, tinhtrang, baohanh, khuyenmai){
    this.props.navigator.push({
      id:routename,
      passProps:{
        productName: name, price: price, color: color, image: image, Mieuta: Des, tinhtrang: tinhtrang, baohanh: baohanh,
        khuyenmai: khuyenmai
      }
      
    })
  }
    
    render(){
        return(
            <Container>
                <Header style={{backgroundColor:'#e67e22'}}>
                    <Left>
                        <Button transparent onPress={()=> this.props.navigator.pop()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.brandName}</Title>
                    </Body>
                    <Right>
                       
                    </Right>
                </Header>
                <View style={styles.productContainer}>
                    <ListView style = {styles.gridView}
						dataSource = {this.state.dataSource}
						renderRow = {this.renderRow.bind(this)}  />
                </View>

            </Container>
        );

    }
}
const styles = StyleSheet.create({
    bar:{
        flex: 1,
        backgroundColor:'#8bc34a',
        flexDirection:'row',
        marginTop: 20,
        height: deviceScreen.width/5-40
    },
    productContainer:{
        flex: 10
    },
    back:{
		flex: 1,
		justifyContent:'center',
		alignItems: 'center'
	},
	backImage:{
		width: 30,
		height: 30
	},
    title:{
		flex: 6,
		justifyContent:'center',
		alignItems:'center'
	},
	titleText:{ color: 'white' },
	none:{ flex:1 },
    gridView:{ flexDirection:'row', flexWrap:'wrap', marginLeft: 10, marginRight: 10 },
	// renderRow
    row:{ height: deviceScreen.height/3 },
	square:{
		width:(deviceScreen.width -20)/2 -20,
		height: deviceScreen.width /2 + 20,
		margin: 10,
		flexDirection:'column',
		borderRadius: 5
	 },
	 productImage: {
		 flex: 8,
		 margin: 10
	 },
	 image:{
		 flex: 0.6, borderRadius: 5, resizeMode: 'contain'
	 },
	 nameView: {
		 flex: 2.5,
		 justifyContent:'center',
		 alignItems: 'center',
		// backgroundColor:'#8bc34a',
		 borderRadius: 15

	 },
	 nameText: {
		 fontSize: 16, color: 'black'
	 }
})