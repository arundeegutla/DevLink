
export type User = {
  email?: string;
  github?: string;
  linkedin?: string;
  firstName: string;
  lastName: string;
  groups: condensedGroup[];
  skills: string[];
};

export type Group = {
  name: string;
  description: string;
  owner: condensedUser;
  members: condensedUser[];
  userQueue: condensedUser[];
  posts: condensedPost[];
  color: string;
};

export type Post = {
  title: string;
  body: string;
  owner: condensedGroup;
  skillsWanted: string[];
};

export type condensedUser = {
  id: string;
  firstName: string;
  lastName: string;
}

export type condensedGroup = {
  id: string;
  name: string;
  description: string;
  color: string;
};

export type condensedPost = {
  id: string;
  title: string;
  body: string;
  skillsWanted: string[];
};