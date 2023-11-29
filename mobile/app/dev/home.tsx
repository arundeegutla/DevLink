import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFBUser } from '../context/FBUserContext';
import { useDLUser } from '../context/DLUserContext';
import Loading from 'components/common/Loading';
import ProjectList from './ProjectList';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PANEL_COMMON_STYLE = {
  backgroundColor: 'rgba(217, 217, 217, 0.65)',
  borderRadius: 20,
  elevation: 4,
  padding: 10,
  marginBottom: 20,
  position: 'relative',
};

const Home = () => {
  const { fbuser } = useFBUser();
  const { user } = useDLUser();
  const [showNewProject] = useState(false);
  const router = useRouter();

  console.log('Logged in as: ' + fbuser.displayName);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Logo in the top left corner */}
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

        {/* Profile icon in the top right corner */}
        <TouchableOpacity onPress={() => router.push('/dev/profile')}>
          <Icon
            name="user-circle"
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerText}>My Projects</Text>

      {!user?.groups || user?.groups.length === 0 ? (
        <Welcome showNewProject={showNewProject} />
      ) : (
        <ProjectList projects={user?.groups} showNewProject={showNewProject} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 3,
    backgroundColor: '#23292D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerText: {
    marginBottom: 4,
    marginLeft: 30,
    fontSize: 35,
    fontWeight: 'normal',
    color: '#ffffff',
  },
  logo: {
    marginTop: 10,
    marginBottom: 20,
    width: 180,
    height: 30,
  },
  profileIcon: {
    fontSize: 30,
    color: '#ffffff',
    marginRight: 10,
  },
});

export default Home;
