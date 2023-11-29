import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { condensedGroup } from '../../src/hooks/models';
import { useRouter } from 'expo-router';

export default function ProjectCard(item: condensedGroup) {
  const [hovering, setIsHovering] = useState(false);
  const router = useRouter();

  const handleChatPress = (groupId: string) => {
    // Navigate to the "/dev/chat" page when the chat icon is pressed
    router.push(`/dev/chat?groupId=${groupId}`);
  };

  return (
    <View
      style={[styles.cardContainer, hovering && styles.hoveredCardContainer]}
      onMagicTap={() => setIsHovering(true)}
      onTouchMove={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}>
      <TouchableOpacity onPress={() => handleChatPress(item.id)} style={styles.chatIcon}>
        <Text style={styles.chatIconText}>💬</Text>
      </TouchableOpacity>
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    //backgroundColor: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBotton: 20,
    padding: 30,
    borderRadius: 8,
  },
  hoveredCardContainer: {
    borderColor: 'white',
    borderWidth: 5,
  },
  cardText: {
    color: 'white',
    fontSize: 30,
  },
  chatIcon: {
    position: 'absolute',
    top: 28,
    right: 15,
    padding: 15,
    backgroundColor: '#051094',
    borderRadius: 25,
  },
  chatIconText: {
    fontSize: 22,
    color: 'white',
  },
});
