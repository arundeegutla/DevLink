import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../../src/firebase/clientApp';
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();

  const loginGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleAuth);

      // Directly check the authentication result using getRedirectResult
      const result = await getRedirectResult(auth);

      // Check if the result is not null and the user is authenticated with a display name
      if (result && result.user && result.user.displayName) {
        router.push('/dev/home'); // Redirect to home page if authenticated
      } else {
        router.push('/auth'); // Redirect to authentication page if not authenticated
      }
    } catch (error) {
      console.error('Google login error:', error);
      router.push('/auth'); // Redirect to authentication page in case of an error
    }
  };
  
  const loginManually = async () => {
    if (!email || !password) return;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        router.push('/dev/home');
      })
      .catch((error: any) => {
        return;
      });
  };

  const navigateToRegistration = () => {
    router.push("/register"); // Navigate to the Registration screen
  };

  const navigateToForgotPassword = () => {
    router.push("/forgotPassword");
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top-left corner */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      <Text style={styles.heading}>Login</Text>
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
      <TouchableOpacity onPress={navigateToForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={loginManually}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Login with:</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="github" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={loginGoogle}>
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
  logo: {
    width: 120, 
    height: 20,
    position: 'absolute',
    top: 35,
    left: 10,
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
  forgotPassword: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
    textDecorationLine: 'underline',
    marginTop: 10,
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
