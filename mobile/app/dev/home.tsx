import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { NativeSyntheticEvent } from 'react-native';

const PANEL_COMMON_STYLE = {
  backgroundColor: 'rgba(217, 217, 217, 0.65)',
  borderRadius: 20,
  elevation: 4,
  padding: 10,
  marginBottom: 20,
  position: 'relative',
};

export default function HomePage() {
  const projectInvitationsScrollView = useRef(null);
  const [selectedTab, setSelectedTab] = useState('All');
  const router = useRouter();
  const myProjectsScrollView = useRef<ScrollView>(null);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    // Logic to filter and display projects based on the selected tab
  };

  const handleScroll = (
    ref: React.MutableRefObject<ScrollView> | null,
    event: NativeSyntheticEvent<ScrollViewScrollEvent>
  ) => {
    if (ref) {
      const scrollY = event.nativeEvent.contentOffset.y;
      ref.current?.scrollTo({ y: scrollY, animated: false });
    }
  };

  // Function to open the chat for a specific project
  const handleOpenProjectChat = (projectId: number) => {
    // Implement logic to open the chat window for the specific project ID
    console.log(`Opening chat for project with ID: ${projectId}`);
    // You can add functionality here to open the chat window for the specific project
  };

  const myProjects = [
    { id: 1, title: 'Project A', description: 'Description for Project A', status: 'In Progress' },
    { id: 2, title: 'Project B', description: 'Description for Project B', status: 'Completed' },
    { id: 3, title: 'Project C', description: 'Description for Project C', status: 'Not Started' },
    // Add more project items as needed
  ];

  const projectInvitations = [
    { id: 1, title: 'Invitation 1', description: 'Description for Project 1' },
    { id: 2, title: 'Invitation 2', description: 'Description for Project 2' },
    { id: 3, title: 'Invitation 3', description: 'Description for Project 3' },
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Navigate to the profile creation page using router.push
              router.push('/dev/home');
            }}
          >
            <Ionicons name="home" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Navigate to the profile creation page using router.push
              router.push('/dev/profile');
            }}
          >
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title: My Projects */}
      <Text style={styles.sectionTitle}>My Projects</Text>

      {/* My Projects Panel */}
      <View style={{ flex: 3 / 5, ...PANEL_COMMON_STYLE }}>
        {/* Tabs for project statuses */}
        <View style={styles.tabsContainer}>
          {['All', 'In Progress', 'Completed', 'Not Started'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.selectedTab]}
              onPress={() => handleTabChange(tab)}
            >
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Projects */}
        <ScrollView
          contentContainerStyle={styles.panelContent}
          onScroll={(event) => handleScroll(myProjectsScrollView, event)}
          ref={myProjectsScrollView}
        >
          {/* Content for My Projects panel */}
          {filteredProjects.map((project) => (
            <View key={project.id} style={styles.projectItem}>
              <View style={styles.projectDetails}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.chatBubble}
                onPress={() => handleOpenProjectChat(project.id)} // Handle opening chat for this project
              >
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
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
            <View key={invitation.id} style={styles.invitationItem}>
              <View>
                <Text style={styles.invitationTitle}>{invitation.title}</Text>
                <Text style={styles.invitationDescription}>{invitation.description}</Text> {/* Display description */}
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D9D9D9',
    marginTop: 5,
    marginLeft: 2,
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
    backgroundColor: 'rgba(217, 217, 217, 0.65)',
    borderRadius: 20,
    elevation: 4,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items horizontally
    alignItems: 'center',
  },
  projectDetails: {
    flex: 1,
  },
  chatBubble: {
    marginLeft: 10,
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
    marginBottom: 20,
    paddingHorizontal: 10, // Add horizontal padding for spacing
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
    alignItems: 'center', // Align icons vertically
  },
  iconButton: {
    padding: 5,
  },
});
