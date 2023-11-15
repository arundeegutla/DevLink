import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from @expo/vector-icons

export default function HomePage() {
  const myProjectsScrollView = useRef(null);
  const projectInvitationsScrollView = useRef(null);

  const handleScroll = (ref, event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    ref.current.scrollTo({ y: scrollY, animated: false });
  };

  const redirectToHome = () => {
    Linking.openURL('http://localhost:8081/dev/home');
  };

  const redirectToProfile = () => {
    Linking.openURL('http://localhost:8081/dev/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Welcome text */}
        <Text style={styles.welcomeText}>Welcome</Text>
        
        {/* Icons */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          {/* Home button */}
          <TouchableOpacity style={styles.button} onPress={redirectToHome}>
            <FontAwesome name="home" size={30} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Profile button */}
          <TouchableOpacity style={styles.button} onPress={redirectToProfile}>
            <FontAwesome name="user-circle" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title: My Projects */}
      <Text style={styles.sectionTitle}>My Projects</Text>

      {/* My Projects Panel */}
      <View style={styles.panel}>
        <ScrollView
          contentContainerStyle={styles.panelContent}
          onScroll={(event) => handleScroll(myProjectsScrollView, event)}
          ref={myProjectsScrollView}
        >
          {/* Content for My Projects panel */}
          {/* Add your project items here */}
        </ScrollView>
        <View style={styles.scrollbar} />
      </View>

      {/* Title: Project Invitations */}
      <Text style={styles.sectionTitle}>Project Invitations</Text>

      {/* Project Invitations Panel */}
      <View style={styles.panel}>
        <ScrollView
          contentContainerStyle={styles.panelContent}
          onScroll={(event) => handleScroll(projectInvitationsScrollView, event)}
          ref={projectInvitationsScrollView}
        >
          {/* Content for Project Invitations panel */}
          {/* Add your project invitations items here */}
        </ScrollView>
        <View style={styles.scrollbar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292D',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  button: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26A8D1',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  panel: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    marginBottom: 20,
    position: 'relative',
  },
  panelContent: {
    flexGrow: 1,
  },
  scrollbar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
  },
});
