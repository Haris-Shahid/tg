import React, { Component } from 'react';
import {AppRegistry ,StyleSheet ,Text ,View ,TouchableHighlight } from 'react-native';
import firebase from 'firebase'
import { StackNavigator, } from 'react-navigation';
import Login from './src/login' ;
import Signin from './src/signin' ;
import MapS from './src/map'
import MapSc from './src/map1'
import PlaceDetails from './src/placedetails'

class Main extends Component {
  static navigationOptions = {
    title: 'Welcome to the Tourist App',
  };
  
  componentDidMount(){
    var config = {
          apiKey: "AIzaSyBxd-SzHHYlVL1Nwi6DhocPMs9b2ORfBKY",
          authDomain: "patient-tracker-8bfac.firebaseapp.com",
          databaseURL: "https://patient-tracker-8bfac.firebaseio.com",
          projectId: "patient-tracker-8bfac",
          storageBucket: "patient-tracker-8bfac.appspot.com",
          messagingSenderId: "1011939244962"
        };
        firebase.initializeApp(config);
  }
  render() {
    const { navigate } = this.props.navigation ;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigate('Signin')}  style={styles.btn} underlayColor='orange' >
          <Text style= {styles.text} >Signin</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('Login')}  style={styles.btn} underlayColor='orange' >
          <Text style= {styles.text} >Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('Map')}  style={styles.btn} underlayColor='orange' >
          <Text style= {styles.text} >Your Loction</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigate('Map1')}  style={styles.btn} underlayColor='orange' >
          <Text style= {styles.text} >Navigate to your dersired destiny</Text>
        </TouchableHighlight>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10 ,
  },
  btn: {
    alignItems:'center' ,
    alignSelf: 'stretch' ,
    marginTop: 10,
    padding: 10 ,
    borderRadius: 20 ,
    backgroundColor: 'blue' ,
    },
    text: {
      color: 'white' ,
      fontSize: 20 ,
      fontWeight: 'bold'
    }
});

const App = StackNavigator({
  Home: { screen: MapS },
  Signin: { screen: Signin },
  Login: { screen: Login },
  Map: { screen: MapS },
  Map1: { screen: MapSc },
  PlaceDetails: { screen: PlaceDetails },
});

AppRegistry.registerComponent('tourist', () => App);


