export type User = {
  email?: string;
  github?: string;
  linkedin: string;
  firstName: string;
  lastName: string;
  groups: Group[];
  skills: string[];
};

export type UserPage = User & {
  groups: condensedGroup[];
};

export type condensedGroup = {
  id: string;
  name: string;
  color: string;
  description: string;
};

export type Group = {
  name: string;
  description: string;
  owner: User;
  members: User[];
  userQueue: User[];
  color: string;
  posts: Post[];
};

export type Post = {
  title: string;
  body: string;
  skillsWanted: string[];
  owner: Group;
  postId: string;
};
