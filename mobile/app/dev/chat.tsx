import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Simulated function to fetch messages from the backend
async function fetchMessagesFromBackend() {
  // Simulate fetching messages from the backend
  return [
    { text: 'Message 1 from backend', sender: 'user1' },
    { text: 'Message 2 from backend', sender: 'user2' },
  ];
}

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Simulate fetching initial messages from backend on component mount
  useEffect(() => {
    async function fetchInitialMessages() {
      const initialMessages = await fetchMessagesFromBackend();
      setChatMessages(initialMessages);
    }

    fetchInitialMessages();
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { text: message, sender: 'user1' }]);
      setMessage('');

      // Simulate sending the message to the backend (not actual backend integration)
      // Replace this with actual API calls to send messages to the backend
      
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContent}>
        {chatMessages.map((chat, index) => (
          <View
            key={index}
            style={chat.sender === 'user1' ? styles.userMessage : styles.otherMessage}
          >
            <Text>{chat.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    flexGrow: 1,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEEEEE',
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
});
