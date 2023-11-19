import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PANEL_COMMON_STYLE = {
  backgroundColor: 'rgba(217, 217, 217, 0.65)',
  borderRadius: 20,
  elevation: 4,
  padding: 10,
  marginBottom: 20,
  position: 'relative',
};

export default function HomePage() {
  const myProjectsScrollView = useRef(null);
  const projectInvitationsScrollView = useRef(null);
  const [selectedTab, setSelectedTab] = useState('All');

  const redirectToHome = () => {
    Linking.openURL('http://localhost:8081/dev/home');
  };

  const redirectToProfile = () => {
    Linking.openURL('http://localhost:8081/dev/profile');
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    // Logic to filter and display projects based on the selected tab
  };

  const handleScroll = (ref, event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    ref.current.scrollTo({ y: scrollY, animated: false });
  };

  const myProjects = [
    { id: 1, title: 'Project A', description: 'Description for Project A', status: 'In Progress' },
    { id: 2, title: 'Project B', description: 'Description for Project B', status: 'Completed' },
    { id: 3, title: 'Project C', description: 'Description for Project C', status: 'Not Started' },
    // Add more project items as needed
  ];

  const projectInvitations = [
    { id: 1, title: 'Invitation 1'},
    { id: 2, title: 'Invitation 2'},
    { id: 3, title: 'Invitation 3'},
    // Add more invitation items as needed
  ];

  const filteredProjects = myProjects.filter((project) => {
    if (selectedTab === 'All') {
      return true;
    } else if (selectedTab === 'In Progress') {
      return project.status === 'In Progress';
    } else if (selectedTab === 'Completed') {
      return project.status === 'Completed';
    } else if (selectedTab === 'Not Started') {
      return project.status === 'Not Started';
    }
    return false;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome Home!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={redirectToHome}>
            <Ionicons name="home" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={redirectToProfile}>
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title: My Projects */}
      <Text style={styles.sectionTitle}>My Projects</Text>

      {/* My Projects Panel */}
      <View style={[styles.panel, { flex: 3 / 5 }, PANEL_COMMON_STYLE]}>
        {/* Tabs for project statuses */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'All' && styles.selectedTab]}
            onPress={() => handleTabChange('All')}
          >
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'In Progress' && styles.selectedTab]}
            onPress={() => handleTabChange('In Progress')}
          >
            <Text style={styles.tabText}>In Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Completed' && styles.selectedTab]}
            onPress={() => handleTabChange('Completed')}
          >
            <Text style={styles.tabText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Not Started' && styles.selectedTab]}
            onPress={() => handleTabChange('Not Started')}
          >
            <Text style={styles.tabText}>Not Started</Text>
          </TouchableOpacity>
        </View>

        {/* Projects */}
        <ScrollView
          contentContainerStyle={styles.panelContent}
          onScroll={(event) => handleScroll(myProjectsScrollView, event)}
          ref={myProjectsScrollView}
        >
          {/* Content for My Projects panel */}
          {filteredProjects.map((project) => (
            <TouchableOpacity key={project.id} style={styles.projectItem}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Title: Project Invitations */}
      <Text style={styles.sectionTitle}>Project Invitations</Text>

      {/* Project Invitations Panel */}
      <View style={[styles.panel, { flex: 2 / 5 }, PANEL_COMMON_STYLE]}>
        <ScrollView
          contentContainerStyle={styles.panelContent}
          ref={projectInvitationsScrollView}
        >
          {/* Content for Project Invitations panel */}
          {projectInvitations.map((invitation) => (
            <TouchableOpacity key={invitation.id} style={styles.invitationItem}>
              <View>
                <Text style={styles.invitationTitle}>{invitation.title}</Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D9D9D9',
    marginTop: 20,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
  },
  // panel: {
  //   flex: 1,
  //   ...PANEL_COMMON_STYLE,
  // },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  selectedTab: {
    backgroundColor: '#26A8D1',
    borderRadius: 8,
  },
  tabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#26A8D1',
    marginBottom: 10,
  },
  panelContent: {
    flexGrow: 1,
    paddingBottom: 10, // Adjusted paddingBottom
  },
  projectItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    ...PANEL_COMMON_STYLE,
    flex: 3 / 5,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
  },
  invitationItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...PANEL_COMMON_STYLE,
    flex: 2 / 5,
  },
  invitationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  invitationDescription: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  iconButton: {
    padding: 5,
  },
});
