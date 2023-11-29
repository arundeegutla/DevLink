import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '../../src/firebase/clientApp';
import { sendPasswordResetEmail } from 'firebase/auth';
import { errorMsg } from '../../src/firebase/authErrors';



export default function ForgotPassword({
  changeScreen,
}: {
  changeScreen: (screen: number) => void;
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alert, setAlert] = useState('');
  const router = useRouter();

  const updateEmail = (val: string) => {
    setEmail(val);
    setEmailError('');
    setAlert('');
  };

  const validate = () => {
    var allgood = true;
    if (!email) {
      setEmailError('Required');
      allgood = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Enter valid email');
      allgood = false;
    }
    return allgood;
  };
  const sendEmail = async () => {
    if (!validate()) return;
    await sendPasswordResetEmail(auth, email)
      .then((e) => {
        //sent
        setAlert('Sent Reset Instructions');
      })
      .catch((error) => {
        // error
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAlert(msg ?? 'User Not Found');
      });
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.heading}>Password Recovery</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
      />

      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={navigateToLogin}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 60,
  },
  label: {
    fontSize: 18,
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
  cancelButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#114E7A',
    fontSize: 16,
    textAlign: 'center',
  },
});
