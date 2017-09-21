import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase' ;

class Signin extends React.Component {
  constructor(){
    super() ;
    this.state = {
      email: '' ,
      password: '',
      err: null  ,
      change: true 
    }
    // console.ignoredYellowBox = [
    //   'Setting a timer'
    //   ];
  }
  submit(){
      const { email , password } = this.state ;
      if ( !(email || password  ) ) {
          alert('Please type something first') ;
      }  else{
          var fire = firebase.auth() 
          fire.createUserWithEmailAndPassword(email,password)
          .catch((error) => {
            this.setState({
                err: error.message,
                change:false,
            })
        })
        this.setState({
            email: '' ,
            password: ''
        })
            

      }
  }

  static navigationOptions = {
    title: 'Registration Form',
  };

  render() {
    const { container, btn, btnC , heading, input, err } = styles
    return (
      <View style={container}>
          <Text style = {heading} >Signin Form</Text>
          <View>
            <TextInput
                style={input}
                value={this.state.email}
                placeholder= {'Type your Email...'}
                placeholderTextColor= {'#00FFFF'}
                selectionColor= {'#0000FF'}
                underlineColorAndroid= {'#0000FF'}
                onChangeText={(email)=> this.setState({email})}
              />
              <TextInput
                style={input}
                value={this.state.password}
                placeholder= {'Type your Password...'}
                placeholderTextColor= {'#00FFFF'}
                selectionColor= {'#0000FF'}
                underlineColorAndroid= {'#0000FF'}
                secureTextEntry= {true}
                onChangeText={(password)=> this.setState({password})}
              />
              <TouchableOpacity style= { btnC } onPress= {()=> this.submit()} >
                  <Text style={btn} >
                      Submit
                  </Text>
              </TouchableOpacity>
              {
            this.state.change ?<Text></Text> : <Text style={err} >{!this.state.err ? '':this.state.err }</Text> 
        }
        </View>
      </View>
    );
  }
}

const { height, width} = Dimensions.get('window') ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40 ,
  },
  container1: {
    justifyContent: 'center' ,
    alignItems: 'center'
  },
  heading: {
    fontSize: 25 ,
    color: '#DC143C' ,
    fontWeight: 'bold' ,
    marginBottom: 20 ,
  },
  input: {
    height: 60,
    paddingLeft: 10 ,
    width: width - 50 ,
  },
  err: {
      color: 'red',
      marginTop: 20
  },
  btn: {
      padding: 10,
      color : 'blue' ,
      fontWeight: 'bold' ,
      textAlign: 'center'
  },
  btnC : {
      backgroundColor: '#ddd' ,
      borderRadius: 20
  }
});

export default Signin ;