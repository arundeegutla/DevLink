import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFBUser } from '../context/FBUserContext';
import { useDLUser } from '../context/DLUserContext';
import Loading from 'components/common/Loading';
import ProjectList from './ProjectList';

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

  console.log('Logged in as: ' + fbuser.displayName);

  return (
    <View style={styles.container}>
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
  },
  headerText: {
    marginBottom: 4,
    fontSize: 24,
    fontWeight: 'normal',
    color: '#ffffff',
  },
});

export default Home;



// export default function HomePage() {
//   const navigation = useNavigation();
//   const myProjectsScrollView = React.useRef(null);
//   const projectInvitationsScrollView = React.useRef(null);

//   const myProjects = [
//     { id: 1, title: 'Project A', description: 'Description for Project A', status: 'In Progress' },
//     { id: 2, title: 'Project B', description: 'Description for Project B', status: 'Completed' },
//     { id: 3, title: 'Project C', description: 'Description for Project C', status: 'Not Started' },
//     // Add more project items as needed
//   ];

//   const handleOpenChat = (projectId) => {
//     console.log(`Opening chat for project with ID: ${projectId}`);
//     // navigation.navigate('Chat', { projectId }); // Uncomment when integrating navigation
//   };

//   const renderProjectItem = (project) => {
//     return (
//       <View key={project.id} style={styles.projectItem}>
//         <View style={styles.projectDetails}>
//           <Text style={styles.projectTitle}>{project.title}</Text>
//           <Text style={styles.projectDescription}>{project.description}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.chatBubble}
//           onPress={() => handleOpenChat(project.id)}
//         >
//           <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const projectInvitations = [
//     { id: 1, title: 'Invitation 1', description: 'Description for Project 1' },
//     { id: 2, title: 'Invitation 2', description: 'Description for Project 2' },
//     { id: 3, title: 'Invitation 3', description: 'Description for Project 3' },
//     // Add more invitation items as needed
//   ];

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.welcomeText}>Welcome Home!</Text>
//         <View style={styles.buttonContainer}>
//           {/* Only the profile button is kept */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               // Navigate to the profile creation page using navigation.navigate
//               navigation.navigate('Profile'); // Replace 'Profile' with your profile screen name
//             }}
//           >
//             <Ionicons name="person" size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Title: My Projects */}
//       <Text style={styles.sectionTitle}>My Projects</Text>

//       {/* My Projects Panel */}
//       <View style={[styles.panel, PANEL_COMMON_STYLE]}>
//         <ScrollView
//           contentContainerStyle={styles.panelContent}
//           ref={myProjectsScrollView}
//         >
//           {/* Content for My Projects panel */}
//           {myProjects.map((project) => renderProjectItem(project))}
//         </ScrollView>
//       </View>

//       {/* Title: Project Invitations */}
//       <Text style={styles.sectionTitle}>Project Invitations</Text>

//       {/* Project Invitations Panel */}
//       <View style={[styles.panel, PANEL_COMMON_STYLE]}>
//         <ScrollView
//           contentContainerStyle={styles.panelContent}
//           ref={projectInvitationsScrollView}
//         >
//           {/* Content for Project Invitations panel */}
//           {projectInvitations.map((invitation) => (
//             <View key={invitation.id} style={styles.invitationItem}>
//               <View>
//                 <Text style={styles.invitationTitle}>{invitation.title}</Text>
//                 <Text style={styles.invitationDescription}>{invitation.description}</Text>
//               </View>
//               <View style={styles.iconContainer}>
//                 <TouchableOpacity style={styles.iconButton}>
//                   <Ionicons name="checkmark-circle" size={24} color="green" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton}>
//                   <Ionicons name="close-circle" size={24} color="red" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#23292D',
//     paddingHorizontal: 10,
//     paddingTop: 20,
//   },
//   welcomeText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#D9D9D9',
//     marginTop: 5,
//     marginLeft: 2,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
//   button: {
//     marginLeft: 10,
//   },
//   sectionTitle: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: '#26A8D1',
//     marginBottom: 10,
//   },
//   panelContent: {
//     flexGrow: 1,
//     paddingBottom: 10, // Adjusted paddingBottom
//   },
//   projectItem: {
//     backgroundColor: 'rgba(217, 217, 217, 0.65)',
//     borderRadius: 20,
//     elevation: 4,
//     padding: 10,
//     marginBottom: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between', // Align items horizontally
//     alignItems: 'center',
//   },
//   projectDetails: {
//     flex: 1,
//   },
//   chatBubble: {
//     marginLeft: 10,
//   },
//   projectTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   projectDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
//   invitationItem: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     ...PANEL_COMMON_STYLE,
//     marginBottom: 20,
//     paddingHorizontal: 10, // Add horizontal padding for spacing
//   },
//   invitationTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   invitationDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center', // Align icons vertically
//   },
//   iconButton: {
//     padding: 5,
//   },
//   panel: {
//     flex: 3 / 5,
//   },
// });
