import React,{Component} from 'react';
import {
  AppRegistry,
  
} from 'react-native';

import App from './Components/App'

//let _emitter = new EventEmitter();
// Class chinh
export default class Shoponline extends Component{
  render(){
     
    return(
      <App/>
    )
  }
}

AppRegistry.registerComponent('Shoponline', () => Shoponline);
