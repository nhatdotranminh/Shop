import React,{Component} from 'react';
import {
  AppRegistry,
  Text, View, Navigator, StyleSheet
} from 'react-native';


import Menu from './Components/Menu';

import Main from './Components/Main';
import Screen2 from './Components/Screen2';


// Class chinh
export default class nativebase extends Component{

  // renderScene Navigator
  renderScene(route, navigator){
    console.log(route);
    if(route.name =='Main'){
      return <Main navigator={navigator}/>
    }
    if(route.name =='Menu'){
      return <Menu navigator={navigator}/>
    }
    if(route.name =='Screen2'){
      return <Screen2 navigator={navigator}/>
    }


  }

  // Render
  render(){

    return(
    <View style={styles.container}>
          <Navigator
            initialRoute={{name: 'Main'}}
            renderScene={this.renderScene.bind(this)}
          />

    </View>


    );
    //  return
  }
  // render
}
const styles= StyleSheet.create({
  container:{
    flex:1,

  }
})

AppRegistry.registerComponent('nativebase', () => nativebase);
