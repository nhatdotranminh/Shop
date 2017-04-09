import React,{Component} from 'react';
import {
  AppRegistry,
  Text, View,Navigator
} from 'react-native';
import Drawer from 'react-native-drawer';
import Menu from '../Components/Menu';


import Main from '../Components/Main'

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3
  }
}


 class drawerScene extends Component{
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
    var controlPanel = <Menu closeDrawer={() => {
      this.drawer.close(); }} />
    return(
      <Drawer
      //  open='true'
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
    //    tweenHandler={this.tweenHandler.bind(this)}
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
        

    </Drawer>
    );
  }
}
module.exports= drawerScene;
