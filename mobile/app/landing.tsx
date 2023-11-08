import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./../assets/images/earth.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.logoContainer}>
          <Image source={require('./../assets/images/logo.png')} style={styles.logoImage} /> 
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Navigate to the login page here.
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 300, 
    height: 50, 
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 19,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
