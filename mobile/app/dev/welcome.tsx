import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/earth.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logoImage} />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.welcomeMessage}>Welcome to the DevLink Community!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Navigate to the profile creation page using router.push
              router.push('/dev/profile');
            }}
          >
            <Text style={styles.buttonText}>Make a Profile</Text>
          </TouchableOpacity>
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
  headerContainer: {
    marginTop: 50,
    marginLeft: 20,
  },
  logoImage: {
    width: 200,
    height: 30,
  },
  messageContainer: {
    marginTop: 140,
    alignItems: 'center',
  },
  welcomeMessage: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
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
