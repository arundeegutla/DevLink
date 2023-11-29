import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { condensedGroup } from '../../src/hooks/models';

export default function ProjectCard(item: condensedGroup) {
  const [hovering, setIsHovering] = useState(false);

  return (
    <View
      style={[
        styles.cardContainer,
        hovering && styles.hoveredCardContainer,
      ]}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Your card contents go here */}
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  hoveredCardContainer: {
    borderColor: 'white',
    borderWidth: 2,
  },
  cardText: {
    color: 'white',
    fontSize: 16,
  },
});
