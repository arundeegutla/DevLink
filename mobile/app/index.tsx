import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./../assets/images/earth.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.logoContainer}>
          <Image source={require('./../assets/images/logo.png')} style={styles.logoImage} /> 
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Navigate to the login page using router.push
                router.push('/login');  
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 300, 
    height: 50, 
  },
  buttonContainer: {
    marginTop: 300, 
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 35,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
