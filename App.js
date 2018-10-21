/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, Dimensions, ListView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import KioskData from './Data/Kiosk.json';
import ListItem from './src/components/ListItem/ListItem.js';

export default class App extends Component {
  state = {
    placeName: 'Current Location',
    places: [],
    focusedLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 
        Dimensions.get("window").width / 
        Dimensions.get("window").height * 
        0.01
    },
    locationChosen: true
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        focusedLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 
          Dimensions.get("window").width / 
          Dimensions.get("window").height * 
          0.01
        }
      });
    },
    err => {
      console.log(err);
      alert("Fetching the Position failed, please pick one manually");
    })
  }

  placeNameChangedHandler = val =>{
    this.setState({
      placeName: val
    });
  };

  pickLocationHandler = event =>{
    const coords = event.nativeEvent.coordinate;

    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        locationChosen: true,
      }
    });
  };

  placeSubmitHandler = () =>{
    if (this.state.placeName.trim() === ""){
      return;
    }

  this.setState(prevState => {
    return {
      places: prevState.places.concat(prevState.placeName)
    };
  });
  
  };

  render() {
    let marker = null;
    let placeInfo = "";

    if(this.state.locationChosen){
      //marker = <MapView.Marker />
      marker = <Marker 
        title='My Location'
        coordinate={this.state.focusedLocation}
      ></Marker>
    }



    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            style={styles.placeInput}
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='false'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);  
            this.setState({
                placeName: data.description, //selected address
                focusedLocation: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 
                  Dimensions.get("window").width / 
                  Dimensions.get("window").height * 
                  0.01
                }
              });
            }}
      
            getDefaultValue={() => ''}
      
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyAltHnnAydxQphvRkCVbzINhRr5G83JNrg',
              language: 'en', // language of the results
              types: 'address' // default: 'geocode'
            }}
      
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        //types: 'food'
      }}

      //filterReverseGeocodingByTypes={['locality', 'postal_code','administrative_area_level_1']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      //predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          ></GooglePlacesAutocomplete>
        </View>
        <View>
          <Text>{this.state.placeName}</Text>
        </View>
        
        <MapView 
          //initialRegion={this.state.focusedLocation}
          //showsUserLocation={true}
          region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
          //ref={MapView => (this.MapView = MapView)}
          //loadingEnabled = {true}
          moveOnMarkerPress = {false}
          showsCompass={true}
          showsPointsOfInterest = {false}
          //provider="google"
          //onLoad={() => this.forceUpdate()}
        >
          {marker}
          
          { KioskData.Kiosk.map((index) => 
          <MapView.Marker key={index} title={index.id} coordinate={{latitude:index.GeoLocation.lat,longitude:index.GeoLocation.lon} }>
          </MapView.Marker>
          )}
          
          
        </MapView>
        <View style={styles.Kiosk}>
        { KioskData.Kiosk.map((index) => 
        <View 
        key={index} 
        style={styles.listItem}
        //onPress={() =>{alert("You seleted Kiosk:"+index.id);}}
        >
        <Button 
          //style={styles.Auto}
          onPress={() =>{alert("You seleted Kiosk:"+index.id);}}
          title="Information"
          >
          </Button>
          <View style={styles.KioskTitile}>
          <Text style={styles.KioskName}>Kiosk: {index.id}</Text>
          <Text style={styles.KioskName}>Status: {index.Status}</Text>
          </View>
          <Text style={styles.Auto}>Address: {index.Address}</Text>
        </View>
        )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: "100%",
    padding:30,
    paddingTop: 60,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: "flex-start",
  },
  inputContainer: {
    //flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  placeInput: {
    width: "100%",
  },
  placeButton: {
    width: "30%",
  },
  listContainer: {
    width: "100%",
  },
  map: {
    width: "100%",
    height: 250
  },
  Auto: {
    width: "100%",
    marginTop:0
  },
  Kiosk: {
    width: "100%",
  },
  listItem: {
    width: "100%",
    paddingTop: 0,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#eee",
  },
  KioskTitile: {
    width: "100%",
    flexDirection: "row",
  },
  KioskName: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  }
});
