import React from 'react';
import { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { Group, condensedGroup } from "src/hooks/models";
import { useGetGroup } from "../../src/hooks/groups";
// import { getPhotoURL } from "src/hooks/users";

import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useFBUser } from '../context/FBUserContext';
import { useDLUser } from '../context/DLUserContext';
import { useLocalSearchParams } from 'expo-router';
import Loading from '../../components/common/Loading';

//
// Simulated hardcoded messages for a project chat
const hardcodedMessages = [
  { text: 'Hello!', sender: 'user' },
  { text: 'Hi there!', sender: 'other' },
  // Add more hardcoded messages as needed
];

export default function ProjectChat() {
  const { fbuser } = useFBUser();
  const { user } = useDLUser();

  // Initialize Firestore
  const firestore = getFirestore();

  // Make a array of the users groups based on user.groups
  const [inputValue, setInputValue] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const searchParams = useLocalSearchParams();
  const [selectedGroup, setParamGroupId] = useState<string>(searchParams.groupId as string)

  // Simulated function to send a message
  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const currValue = inputValue;
      setInputValue("");
      await addDoc(
        collection(firestore, "Groups", selectedGroup, "messages"),
        {
          id: fbuser.uid,
          content: currValue,
          created: serverTimestamp(),
        }
      );
    }
  };

  const { data: groupData, isLoading, isError } = useGetGroup(fbuser, selectedGroup) as { data: Group, isLoading: boolean, isError: boolean };  // Make an array of all the messages in a group based on the group's messages subcollection and sort by timestamp
  const [messages, setMessages] = useState<
    { messageKey: string; id: string; content: string, sender: string }[]
  >([]);
  useEffect(() => {

    if (!groupData) return;
    setLoadingMessages(true);

    const q = query(
      collection(
        doc(collection(firestore, "Groups"), selectedGroup),
        "messages"
      ),
      orderBy("created", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
          let owner = groupData.members.find((member) => member.id === doc.data().id);
          return {
            messageKey: doc.id,
            id: doc.data().id as string,
            content: doc.data().content as string,
            sender: ((owner?.firstName || "") + " " + (owner?.lastName || "")).trim()
          }
        })
      );
      setLoadingMessages(false);
    });
    return unsubscribe;
  }, [groupData, selectedGroup]);

  if (!groupData) return <Loading />

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={styles.chatContent} style={styles.scrollContainer}>
        {messages.map((chat) => (
          <View>
            <Text style={styles.whiteText}>{chat.id !== fbuser.uid ? chat.sender : ""}</Text>
            <View
              key={chat.id}
              style={
                chat.id === fbuser.uid ? styles.userMessage : styles.otherMessage
              }>
              <Text style={styles.whiteText}>{chat.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <FontAwesome name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23292D',
    padding: 10,
  },
  chatContent: {
  },
  userMessage: {
    alignSelf: 'flex-end',
    color: "white",
    backgroundColor: 'rgb(33 138 255)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(142 142 147)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingTop: 5,
    paddingBottom: 40,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    color: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#3B6978',
    padding: 10,
    borderRadius: 5,
  },
  whiteText: {
    color: "#fff"
  },
  scrollContainer: {
    flexDirection: "column-reverse"
  }
});
