import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { condensedGroup } from '../../src/hooks/models';
import { Dispatch, SetStateAction } from 'react';
import ProjectCard from '../../components/common/ProjectCard';

const ProjectList = ({
  projects,
  showNewProject,
}: {
  projects: condensedGroup[];
  showNewProject: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View>
      {/* Add any other content or header here */}
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()} // Adjust the key as needed
        renderItem={({ item }) => (
          <ProjectCard
            key={item.id}
            {...item} // Pass the entire item as props to ProjectCard
          />
        )}
      />
    </View>
  );
};

export default ProjectList;
