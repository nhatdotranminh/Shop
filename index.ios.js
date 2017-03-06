import React,{Component} from 'react';
import {
  AppRegistry,
  Text, View, Navigator, StyleSheet, TouchableOpacity
} from 'react-native';
//import { EventEmitter } from 'fbemitter';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer';

import Menu from './Components/Menu';
import Main from './Components/Main';
import Screen2 from './Components/Screen2';
import LaptopProducts from './Components/LaptopProducts'
import Detail from './Components/Detail'

import navigationHelper from './Components/navigation';

//let _emitter = new EventEmitter();
// Class chinh
export default class Shoponline extends Component{
  componentDidMount(){
    /*var self= this;
    _emitter.addListener('openMenu',() =>{
      self._drawer.open();
    })
    _emitter.addListener('back', () => {
            self._navigator.pop();
        });*/
  }
  _renderScene(route, navigator){
    switch(route.id){
      case 'Main':
        return(<Main navigator={navigator}{...route.passProps}/>)
      case 'LaptopProducts':
        return(<LaptopProducts navigator={navigator}{...route.passProps}/>)
      case 'Screen2':
        return(<Screen2 navigator={navigator}{...route.passProps}/>)
      case 'Detail':
        return(<Detail navigator={navigator}{...route.passProps}/>)
      
    }

  }
  constructor(props){
    super(props)
    this.state={

      drawerType: 'overlay',
      openDrawerOffset:0.2,
      closedDrawerOffset:-3,
      panOpenMask: 0.2,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      rightSide: false,
    }
  }
  openDrawer(){
    this.drawer.open()
  }
  
  render(){
     
    return(
      <Drawer
      //  open='true'
        ref={(ref) => this.drawer = ref}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this.drawer.close()
                }}/>}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.rightSide ? 'right' : 'left'}
        >
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Main',
                        index: 0
                    }}
                    renderScene={(route, navigator) => this._renderScene(route, navigator)}
                    
                />
         </Drawer>
    );
  }
}
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
}
  
const styles= StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center'
    },
    
})

AppRegistry.registerComponent('Shoponline', () => Shoponline);
