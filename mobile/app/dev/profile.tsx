import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Avatar, Button, TextInput, Switch } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('john.doe@example.com');
  const [linkedin, setLinkedin] = useState<string>('https://www.linkedin.com/in/johndoe');
  const [github, setGithub] = useState<string>('https://github.com/johndoe');
  const [skills, setSkills] = useState<string>('React Native, TypeScript, Expo');
  const [contactSharing, setContactSharing] = useState<boolean>(true);

  const pickImage = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })) as ImagePicker.ImagePickerResult & { uri?: string };
  
    if (!result.canceled && result.uri) {
      setImage(result.uri);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Image size={120} source={image ? { uri: image } : require('../../assets/images/earth.png')} />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <TextInput
          style={styles.input}
          value={skills}
          onChangeText={(text) => setSkills(text)}
          mode="outlined"
          placeholder="Enter your skills"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          value={linkedin}
          onChangeText={(text) => setLinkedin(text)}
          mode="outlined"
          placeholder="LinkedIn URL"
        />
        <TextInput
          style={styles.input}
          value={github}
          onChangeText={(text) => setGithub(text)}
          mode="outlined"
          placeholder="GitHub URL"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity onPress={handleEditProfile}>
          <Text style={styles.link}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.link}>Change Password</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable Contact Sharing</Text>
          <Switch value={contactSharing} onValueChange={() => setContactSharing(!contactSharing)} />
        </View>
      </View>

      <View style={styles.logoutButtonContainer}>
        <Button mode="outlined" onPress={handleLogout} color="#fff" style={styles.logoutButton}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292D',
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    color: '#ddd',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  link: {
    color: '#61dafb',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    color: '#fff',
    flex: 1,
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
  logoutButton: {
    borderColor: '#fff',
  },
});

export default ProfileScreen;
