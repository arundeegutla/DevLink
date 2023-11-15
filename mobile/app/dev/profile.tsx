import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Avatar, Button, TextInput, Switch } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

  const ProfileScreen: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('john.doe@example.com');
  const [linkedin, setLinkedin] = useState<string>('https://www.linkedin.com/in/johndoe');
  const [github, setGithub] = useState<string>('https://github.com/johndoe');
  const [skills, setSkills] = useState<string>('React Native, TypeScript, Expo');
  const [contactSharing, setContactSharing] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const redirectToHome = () => {
    Linking.openURL('http://localhost:8081/dev/home');
  };

  const redirectToProfile = () => {
    Linking.openURL('http://localhost:8081/dev/profile');
  };

  const renderEditableField = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string
  ) => {
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        {isEditing ? (
          <TextInput
            style={[styles.input, { backgroundColor: '#fff' }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
          />
        ) : (
          <Text style={styles.input}>{value}</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={redirectToHome}>
          <FontAwesome name="home" size={30} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={redirectToProfile}>
          <FontAwesome name="user-circle" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Avatar.Image size={120} source={image ? { uri: image } : require('../../assets/images/earth.png')} />
        </TouchableOpacity>
        {isEditing ? (
          renderEditableField(null, name, setName, "Enter your name")
        ) : (
          <Text style={[styles.input, { marginTop: 10 }]}>{name}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {renderEditableField("Email", email, setEmail, "Enter your email")}
        {renderEditableField("LinkedIn", linkedin, setLinkedin, "LinkedIn URL")}
        {renderEditableField("GitHub", github, setGithub, "GitHub URL")}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { backgroundColor: '#fff' }]}
            value={skills}
            onChangeText={(text) => setSkills(text)}
            placeholder="Enter your skills"
            underlineColorAndroid="transparent"
          />
        ) : (
          <Text style={styles.input}>{skills}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity onPress={isEditing ? handleSaveProfile : handleEditProfile}>
          <Text style={styles.link}>{isEditing ? "Save Profile" : "Edit Profile"}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
    color: '#fff',
    height: '80%',
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
