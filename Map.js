import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput, Button } from 'react-native-paper';

export default function Map() {

    const [address, setAddress] = useState('');
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });

    const [beautysalons, setBeautysalons] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setRegion({
                ...region,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        });
    }, []);

    useEffect(() => {
        showBeautysalons();
    }, [region]);

    const showAddress = () => {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAyxyfyMxd76oBGbwFYiySyny7HBxB0QLo';
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                setRegion({
                    ...region,
                    latitude: responseData.results[0].geometry.location.lat,
                    longitude: responseData.results[0].geometry.location.lng
                });
            })
            .then(() => showBeautysalons())
            .catch(err => Alert.alert('Try typing again'));
    }

    const showBeautysalons = () => {
        if (region.latitude && region.longitude) {
            const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + region.latitude + ',' + region.longitude + '&radius=500&type=beauty_salon&key=AIzaSyAyxyfyMxd76oBGbwFYiySyny7HBxB0QLo';
            fetch(url)
                .then(response => response.json())
                .then(responseData => setBeautysalons(responseData.results))
                .catch(err => Alert.alert('Error', 'Something went wrong'));
        }
        else {
            Alert.alert('Warning', 'No coordinates available');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textinput}
                    label='Find Salons Near By...'
                    value={address}
                    type='outlined'
                    onChangeText={address => setAddress(address)}
                    returnKeyType="search"
                />
                <Button
                    style={styles.button}
                    mode='elevated'
                    onPress={showAddress}>
                    Find
                </Button>

                <MapView
                    style={styles.map}
                    region={region}>
                    {
                        beautysalons.map((marker, index) => (
                            <MapView.Marker
                                title={marker.name}
                                key={index}
                                coordinate={{ 
                                    latitude: marker.geometry.location.lat, 
                                    longitude: marker.geometry.location.lng 
                                }}
                                description={marker.vicinity}
                            />
                        ))}
                </MapView>
            </View>
            <View>
                <GooglePlacesAutocomplete
                    onPress={(data, details = null) => {
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyCxPVRS94bOuHPL3KKVItgLp8GsrkTyaOc',
                        language: 'en',
                    }}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    map: {
        flex: 2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    textinput: {
        fontSize: 16,
        marginTop: 50,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#ffffff',
        height: 65,
    },
    button: {
        marginTop: 20,
        marginBottom: 15,
        width: 100,
        marginLeft: 150,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
});
