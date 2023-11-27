
export type User = {
  email?: string;
  github?: string;
  linkedin?: string;
  firstName: string;
  lastName: string;
  groups: DocumentReference[];
  skills: string[];
};

export type UserPage = User & {
 groups: condensedGroup[];
}

export type GroupPage = Group & {
  members: condensedUser[];
  posts: condensedPost[];
};

export type condensedPost = {
  id: string;
  title: string;
  body: string;
  skillsWanted: string[];
};

export type condensedGroup = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type PostPage = Post & {
  owner: condensedGroup
};

export type condensedUser = {
  id: string;
  firstName: string;
  lastName: string;
}

export type Group = {
  name: string;
  description: string;
  owner: DocumentReference;
  members: DocumentReference[];
  userQueue: DocumentReference[];
  posts: DocumentReference[];
  color: string;
};

export type Post = {
  title: string;
  body: string;
  owner: DocumentReference;
  skillsWanted: string[];
};