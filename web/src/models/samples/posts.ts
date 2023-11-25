export type User = {
  id: string;
  name: string;
  // ... other user properties
};

export type Project = {
  id: string;
  title: string;
  owner: User;
  members: User[];
  posts: Post[];
};

export type Post = {
  title: string;
  body: string;
  project: Project; // Each post must have a linked project
  skillsWanted: string[];
};

// Sample posts
export const samplePosts: Post[] = [
  {
    title: 'Looking for Frontend Developer',
    body: 'We are seeking a skilled frontend developer to join our team.',
    project: {
      id: 'project1',
      title: 'Web Development Project',
      owner: { id: 'user1', name: 'John Doe' },
      members: [{ id: 'user2', name: 'Jane Doe' }],
      posts: [],
    },
    skillsWanted: ['JavaScript', 'React', 'CSS3'],
  },
  {
    title: 'Exciting Full Stack Opportunity',
    body: 'Join our project as a full-stack developer and contribute to innovative solutions.',
    project: {
      id: 'project2',
      title: 'Full Stack Project',
      owner: { id: 'user3', name: 'Bob Smith' },
      members: [{ id: 'user4', name: 'Alice Johnson' }],
      posts: [],
    },
    skillsWanted: ['JavaScript', 'React.js', 'Node.js', 'MongoDB'],
  },
  {
    title: 'Backend Developer Wanted',
    body: 'Our backend team is expanding, and we are looking for a talented developer to join us.',
    project: {
      id: 'project3',
      title: 'Backend Development Project',
      owner: { id: 'user5', name: 'Eva Rodriguez' },
      members: [{ id: 'user6', name: 'Carlos Martinez' }],
      posts: [],
    },
    skillsWanted: ['Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Backend Developer Needed',
    body: 'Looking for an experienced backend developer to enhance our server-side functionalities.',
    project: {
      id: 'project3',
      title: 'Backend Project',
      owner: { id: 'user5', name: 'Eva Johnson' },
      members: [{ id: 'user6', name: 'Alex Turner' }],
      posts: [],
    },
    skillsWanted: ['Node.js', 'MongoDB', 'GraphQL'],
  },
  {
    title: 'UI/UX Designer Wanted',
    body: 'Join our design team and contribute to creating beautiful and user-friendly interfaces.',
    project: {
      id: 'project4',
      title: 'Design Project',
      owner: { id: 'user7', name: 'Grace Miller' },
      members: [{ id: 'user8', name: 'Chris Evans' }],
      posts: [],
    },
    skillsWanted: ['React.js', 'CSS3', 'Sass'],
  },
  // Add more sample posts as needed
];
