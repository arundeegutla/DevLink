import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function GroupChat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const navigation = useNavigation();

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const navigateToHomePage = () => {
    // Redirect to http://localhost:8081/dev/home
    window.location.href = 'http://localhost:8081/dev/home';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigateToHomePage}>
        <FontAwesome name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.chatContent}>
        {chatMessages.map((chat, index) => (
          <View
            key={index}
            style={chat.sender === 'user' ? styles.userMessage : styles.otherMessage}
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
  backButton: {
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
