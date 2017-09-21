
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';


export default class MapSc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 24.8825,
        longitude: 67.0694,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      marker: {
        latitude: 0, 
        longitude: 0
      }
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var latitude = position.coords.latitude ;
        var longitude = position.coords.longitude ;
        console.warn(latitude,longitude)
        var region = {
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }
        this.setState({
            region
        })
    },
      (err) => console.warn(err.message)
  ) 
  }

  openSearchModal() {
    // RNGooglePlaces.openAutocompleteModal()
    //   .then((place) => {
    //     console.log(place);
    //     this.setState({
    //       latitude: place.latitude,
    //       longitude: place.longitude
    //     })
    //   })
    //   .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsPointOfInternet={false}
          toolbarEnabled={true}
          style={styles.map}
          region={this.state.region}
          provider= "google"
          mapType="standard"

        >
          <MapView.Marker
            coordinate={this.state.marker}
          >
          </MapView.Marker>
        </MapView>
        <View style={styles.container}>
            
       </View>
       </View>
    );
  }
}
// onRegionChange={this.onRegionChange}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 350 ,

  },
  pin: {
    backgroundColor: "#fffa",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  },
  pinImage: {
    width: 20,
    height: 20
  },
  pinText: {
    color: 'red'
  }
  ,
  callout: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginRight: 10
  },
  calloutPhoto: {
    flex: 1,
    width: 200,
    height: 80
  },
  calloutTitle: {
    fontSize: 16
  }
});
