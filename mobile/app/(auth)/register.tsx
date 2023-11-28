import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../src/firebase/clientApp';
import Icon from 'react-native-vector-icons/FontAwesome';
import { errorMsg } from '../../src/firebase/authErrors';

import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';


export default function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();

  const signUpManually = async () => {
    if (!email || !password) return;
    const loginAuth = getAuth();
    createUserWithEmailAndPassword(loginAuth, email, password)
      .then(() => {
        router.push('/dev/welcome'); // Redirect after successful registration
      })
      .catch(function (error: any) {
        console.log(error);
        router.push('/auth');
      });
  };

  const signUpGoogle = async () => {
    await signInWithPopup(auth, googleAuth)
      .then((result) => {
        if (result.user.displayName) {
          router.push('/dev/welcome');
          return;
        }
      })
      .catch((error) => {
        router.push('/auth');
      });
  };

  const navigateToLogin = () => {
    router.push("/login"); // Navigate back to the Login screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.heading}>Registration</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={signUpManually}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Signup with:</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="github" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={signUpGoogle}>
          <Icon name="google" size={30} color="#EA4335" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292D',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 120, 
    height: 20,
    position: 'absolute',
    top: 15,
    left: 10,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 45,
    paddingBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#114E7A',
    padding: 10,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 30,
    margin: 10,
  },
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

function setAuthError(arg0: string) {
  throw new Error('Function not implemented.');
}
