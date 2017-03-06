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
var detail= [];
//

export default class Cart extends Component{
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
    navigate(routename){
        this.props.navigator.push({
            id: routename,
            passProps:{

            }
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
                        <Button transparent onPress={()=> this.navigate('Main')}>
                             <Icon style={{fontSize: 20}}name='home'/>
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
     }
}
  const styles=StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor:'green'
    },
  })