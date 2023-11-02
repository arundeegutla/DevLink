import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../src/firebase/clientApp';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const loginManually = async () => {
    if (!email || !password) return;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/home');
      })
      .catch((error) => {
        return;
      });
  };

  const navigateToRegistration = () => {
    router.push("/register"); // Navigate to the Registration screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your username"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={loginManually}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Login with:</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="github" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="linkedin" size={30} color="#0072b1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={30} color="#EA4335" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={navigateToRegistration}>
        <Text style={styles.signUpText}>Don't have an Account? Sign Up</Text>
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
  heading: {
    color: '#FFFFFF',
    fontSize: 45,
    paddingBottom: 30,
    textAlign: 'center', // Center the text
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