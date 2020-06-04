import React, { Component, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView,{Marker} from 'react-native-maps';

class Localizacion extends Component  {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error:null,

    };

  }



  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });

       },

       (error) => this.setState({ error: error.message }),

       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },

     );

   }


  render() {

    return (

      <MapView style={styles.map} initialRegion={{
       latitude:this.state.latitude,
       longitude:this.state.longitude,
       latitudeDelta: 1,
       longitudeDelta: 1
      }}>
      {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}
      </MapView>

    );

  }

}
const styles=StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject
  },
  map:{
    ...StyleSheet.absoluteFillObject
  }
})
export default Localizacion;
