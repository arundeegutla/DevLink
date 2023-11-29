import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../src/firebase/clientApp';
import {
  signInWithEmailAndPassword,
  signInWithCredential,
} from 'firebase/auth';
import Snackbar from 'react-native-snackbar';
import { errorMsg } from '../../src/firebase/authErrors';
import Alert from '../../components/common/Alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authErr, setAuthErr] = useState('');

  const router = useRouter();

  const loginManually = async () => {
    if (!email || !password) return;
    console.log('Logging in manually: ' + email + ' ' + password);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dev/home');
    } catch (error: any) {
      console.log(error.code);
      var msg =
        errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
      setAuthErr(msg ?? 'Incorrect Username or Password');
    }
  };

  const navigateToRegistration = () => {
    router.push('/register'); // Navigate to the Registration screen
  };

  const navigateToForgotPassword = () => {
    router.push('/forgotPassword');
  };

  return (
    <View style={styles.container}>
      {/* Logo at the top-left corner */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.heading}>Login</Text>
      {authErr && <Alert alertType="danger">{authErr}</Alert>}

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

      {/* <Text style={styles.orText}>Login with:</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="github" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={loginGoogle}>
          <Icon name="google" size={30} color="#EA4335" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={navigateToRegistration}>
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
    top: 50,
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
