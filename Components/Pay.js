import React,{Component} from 'react';
import {
    Text,View,
} from 'react-native';
import {
    Container, Header, Title, Button, Left, Right, Body
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
//
//Fire base
import firebaseApp from './firebase';
//
export default class Pay extends Component{
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
                         <Text>Thanh toan </Text>
                    </Body>

                    <Right>
                      <Button transparent onPress={()=> this.navigate('Main', this.props.cartId)}>
                        <Icon style={{fontSize: 20}}name='home'/>
                      </Button>
                    </Right>

             </Header>
            </Container>
        );
    }
}