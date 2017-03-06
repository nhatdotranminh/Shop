import React, {Component} from 'react';
import{
  View,
  Text,Alert,
  StyleSheet, Image, Dimensions,TouchableOpacity,Navigator,ListView

} from 'react-native';
//import styles from './styles';
import{
  Container, Content, ListItem, Left, Body, Right, Switch, Radio,  Icon, Badge
} from 'native-base'
import Screen2 from './Screen2'
import Button from 'react-native-button';
var deviceScreen = Dimensions.get('window')
var _navigate;

export default class Menu extends Component{
  constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Menu', 'Screen2'])
        });
    }

    _renderMenuItem(item) {
        return(
            <Button style={styles.menuItem} onPress={()=> this.onItemSelect(item)}>{item}</Button>
        );
    }
  onItemSelect(item) {
        _navigate(item);
    }
    

  render() {
    return (
        <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(item) => this._renderMenuItem(item)}
            />
    )
  }

}
const styles= StyleSheet.create({
  menucontainer:{
    flex : 1,

  },
  imagecontent:{
    flex:3,

  },
  image:{
    flex: 1,
    width: deviceScreen.width/1.5 + 45 , height: deviceScreen.height/3-20,
    resizeMode:'stretch', marginBottom: 5, borderRadius: 5
  },
  buttoncontainer:{
    flex: 5,


  },
  button:{
    flex:1,
    borderBottomWidth:0.3,
    borderColor:'black',
    flexDirection:'row'
  },

  none:{
    flex: 11,
    backgroundColor:'white'
  },
  text:{
    alignSelf:'center',
    fontSize: 18,
    fontWeight:'200',
    fontFamily: 'Cochin'


  },
  leftIcon:{
    flex:2,
    marginLeft: 10,
    justifyContent: 'center'
  },
  body:{
    flex: 10,
    alignItems:'flex-start',
    justifyContent:'flex-start',
  },
  rightIcon:{
    flex: 7,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    marginRight:5,

  },
  menuItem: {
        color: '#333',
        padding: 10,
        textAlign: 'left'
    }




})
