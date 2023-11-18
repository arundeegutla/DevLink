import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [skills, setSkills] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Ask for permission to access the camera roll
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Sorry, we need camera roll permissions to make this work!'
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.uri) {
      setProfileImage(result.uri);
    }
  };

  const saveProfile = () => {
    // save the profile, including the profile image URI
    Alert.alert('Profile Saved', 'Your profile has been saved successfully.');
  };

  const logout = () => {
    // logic to handle logout
    Alert.alert('Logout', 'You have been logged out.');
    // navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pickImage}
        style={styles.profileImageContainer}
      >
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>Upload Picture</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.label}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#A9A9A9"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="GitHub URL"
          placeholderTextColor="#A9A9A9"
          value={githubUrl}
          onChangeText={(text) => setGithubUrl(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="LinkedIn URL"
          placeholderTextColor="#A9A9A9"
          value={linkedinUrl}
          onChangeText={(text) => setLinkedinUrl(text)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Skills</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your skills"
          placeholderTextColor="#A9A9A9"
          multiline
          value={skills}
          onChangeText={(text) => setSkills(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Logo at the bottom */}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#23292D',
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2C3840',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageText: {
    color: '#87CEEB',
  },
  section: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2C3840',
    color: '#87CEEB',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2C3840',
  },
  button: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 35,
  },
});

export default Profile;
