import React, {Component} from 'react';
import { View ,Text, Button, StyleSheet , TextInput, Dimensions } from 'react-native';
import firebase from 'firebase'


export default class Login extends Component {
   constructor(){
       super() ;
       this.state = {
           email: '',
           password: '' ,
           err: null  ,
           change: true 
       }
   }
   submitlogin(){
       const {email, password, err } = this.state ;
        firebase.auth().signInWithEmailAndPassword(email, password) 
        .catch((error) => {
            this.setState({
                err: error.message
            })
        })
        this.setState({
            change:false
        })
   }
    static navigationOptions = {
      title: 'Login Page',
    };
    render() {
      const { navigate } = this.props.navigation ;
      const { container, err, heading, input, } = styles
    return (
      <View style={container}>

          <Text style = {heading} >Login Form</Text>
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
              <Button
                onPress={this.submitlogin.bind(this)}
                title="Submit"
                color="#FF7F50"
                underlayColor='black'
              />
              
        </View>
        {
            this.state.change ?<Text></Text> : <Text style={err} >{this.state.err ? this.state.err: 'user  signin' }</Text> 
        }
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
      err:{
        marginTop: 20,
        color: 'red'
      },
      input: {
        height: 60,
        paddingLeft: 10 ,
        width: width - 50 ,
      },
      heading: {
        fontSize: 25 ,
        color: '#DC143C' ,
        fontWeight: 'bold' ,
        marginBottom: 20 ,
      },
  })
  