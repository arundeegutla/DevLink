import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDLUser } from '../context/DLUserContext';
import Loading from '../../components/common/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../src/firebase/clientApp';
import { useEditProfile, useCreateProfile } from '../../src/hooks/users';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();
  const { user, refetch } = useDLUser();
  const [fbuser, authLoading, authError] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [githubUrl, setGithubUrl] = useState(user?.github || '');
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin || '');
  const [skills, setSkills] = useState(
    user?.skills ? user.skills.join(', ') : ''
  );

  const editProfileMutation = useEditProfile();
  const createProfileMutation = useCreateProfile();

  useEffect(() => {
    if (fbuser) {
      setLoading(false);
    } else {
      // Redirect or handle the absence of the user as required
    }
  }, [fbuser]);

  const saveProfile = async () => {
    try {
      const profileData = {
        firstName,
        lastName,
        email,
        github: githubUrl,
        linkedin: linkedinUrl,
        skills: skills.split(',').map((skill) => skill.trim()),
      };

      if (user) {
        // Update existing profile
        const updateSuccess = await editProfileMutation.mutateAsync({
          user: auth.currentUser!,
          profile: profileData,
        });

        if (updateSuccess) {
          Alert.alert(
            'Profile Updated',
            'Your profile has been updated successfully.'
          );
          // Refetch user data after updating the profile
          await refetch();
        } else {
          Alert.alert(
            'Error',
            'Failed to update the profile. Please try again.'
          );
        }
      } else {
        // Create new profile
        const createSuccess = await createProfileMutation.mutateAsync({
          user: auth.currentUser!,
          profile: profileData,
        });

        if (createSuccess) {
          Alert.alert(
            'Profile Created',
            'Your profile has been created successfully.'
          );
          // Refetch user data after creating a new profile
          await refetch();
        } else {
          Alert.alert(
            'Error',
            'Failed to create the profile. Please try again.'
          );
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/');  
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (authLoading || loading) {
    return <Loading />;
  } else if (authError || !fbuser) {
    // Handle authentication error or absence of user
    return (
      <View>
        <Text>Error occurred or user not found</Text>
      </View>
    );
  }
  const goHome = () => {
    router.push('/dev/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Personal Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor="#A9A9A9"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            placeholderTextColor="#A9A9A9"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>GitHub</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your GitHub URL"
            placeholderTextColor="#A9A9A9"
            value={githubUrl}
            onChangeText={(text) => setGithubUrl(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>LinkedIn URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your LinkedIn URL"
            placeholderTextColor="#A9A9A9"
            value={linkedinUrl}
            onChangeText={(text) => setLinkedinUrl(text)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label2}>Skills</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your skills"
          placeholderTextColor="#A9A9A9"
          multiline
          value={skills}
          onChangeText={(text) => setSkills(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={goHome}>
        <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#23292D',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
    width: '100%',
  },

  label: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    marginTop: 30,
  },
  label2: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2C3840',
    color: '#87CEEB',
    padding: 10,
    borderRadius: 5,
    marginBottom: 0,
    borderWidth: 1.5,
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
