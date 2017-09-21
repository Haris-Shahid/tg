import React, { Component } from 'react'
import {TextInput,Button, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import getDirections from 'react-native-google-maps-directions'
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import Geocoder from 'react-native-geocoder';

export default class MapSc extends Component {
  static navigationOptions = {
    header : false
  }
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    this.getDirections = this.getDirections.bind(this);
    this.getDirectionRoute = this.getDirectionRoute.bind(this);
    this.getLatLong = this.getLatLong.bind(this);

    this.state = {
      destlat:'',
      destlong: '',
      srclat:24.8825,
      srclong:67.0694,
      dest:'',
      coords: []
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          srclat: position.coords.latitude,
          srclong: position.coords.longitude
        })
       
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getDirectionRoute() {
    let arr1 = `${this.state.srclat}`+','+`${this.state.srclong}`
    let arr2 = `${this.state.destlat}`+','+`${this.state.destlong}`
    this.getDirections(arr1, arr2);
  }


  getLatLong(dest) {
    this.setState({dest});
    Geocoder.geocodeAddress(dest).then(res => {
      this.setState({
        destlat: res[0].position.lat,
        destlong: res[0].position.lng
      });
    
     
    })
      .catch(err => console.log(err))
  }

  async getDirections(startLoc, destinationLoc) {
    console.log(startLoc,destinationLoc)
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`)
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      return coords
    } catch (error) {
      alert(error)
      return error
    }
  }

  render() {
    return (
      <View>
        <MapView.Callout style={styles.button} >
          <TextInput
                placeholder="Enter your destination"
                onChangeText={(dest)=>this.getLatLong(dest)}
                value={this.state.dest}
            />
            <Button onPress={this.getDirectionRoute} title='Get Direction Route' ></Button>
          </MapView.Callout>
        <MapView style={styles.map} initialRegion={{
          latitude: parseFloat(this.state.srclat),
          longitude: parseFloat(this.state.srclong),
          latitudeDelta: 0.0922*10,
          longitudeDelta: 0.0421*10
        }}>
              
          
          <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red" />
            
            
        </MapView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 1
  },
  button: {
    zIndex:2
  }
});

