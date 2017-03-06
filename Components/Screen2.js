import React, {Component} from 'react';
import {
  View, Text,TouchableOpacity,Navigator
} from 'react-native';
import {
  Spinner
} from 'native-base';


class Screen2 extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <View style={{flex: 1,backgroundColor:'green', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress={()=> this.props.navigator.pop()}>
          <Text>Man hinh 2</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



module.exports=Screen2;
