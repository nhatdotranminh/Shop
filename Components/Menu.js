import React, {Component} from 'react';
import{
  View,
  Text,Alert,
  StyleSheet, Image, Dimensions,TouchableOpacity,Navigator,ListView,

} from 'react-native';
//import styles from './styles';
import{
    Icon, Button, Thumbnail
} from 'native-base'
import Login from './Login'

var deviceScreen = Dimensions.get('window')
var _navigate;

export default class Menu extends Component{
  constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            avatarimg:require('../Images.gray.jpeg')
        };
        _navigate = this.props.navigate;
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Main', 'Login'])
        });
    }

    _renderMenuItem(item) {
        return(
            <Button transparent onPress={()=> this.onItemSelect(item)}><Text style={{color:'white'}}>{item}</Text></Button>
        );
    }
   onItemSelect(item) {
        _navigate(item);
    }
    

  render() {
    return (
     
      <View style={styles.container}>
        
        <View style={styles.userInfo}>
          <View style={styles.userView}>
             <Thumbnail  style={{width: 80, height: 80, borderRadius: 40}} source={require('../Images/gray.jpeg')}/>
             <Text style={styles.nameText}> User name </Text>
          </View>
        </View>
        <View style={styles.main}>
          <ListView
              style={styles.container}
              dataSource={this.state.dataSource}
              renderRow={(item) => this._renderMenuItem(item)}
              />
        </View>
        <View style={styles.content}>
        </View>
      </View>
    )
  }

}
const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#34495e'
  },
  userInfo:{
    marginTop: 20,
    flex: 1.5,
    borderWidth: 0.5
  },
  main:{
    flex: 1.5,
    borderWidth: 0.5
  },
  content:{
    flex: 5,
    borderWidth: 0.5
  },
  userView:{
    flexDirection:'row',
    margin: 10,
  },
  nameText:{
    padding: 10,
    fontSize: 16,
    color:'white'
  }


})
