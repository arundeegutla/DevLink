import { NextApiRequest, NextApiResponse } from 'next';
import {
  queryUserbyId,
  queryUserbyName,
  createProfile,
  editProfile,
} from '@/server/src/services/user';
import { User } from '@/server/src/models/db';
import { validateNewUser, validateEdit } from '@/server/src/utils/user';

type Data = {
  success?: boolean;
  error?: string;
  [key: string]: any; // To allow dynamic response properties
};

// Utility function for error handling
const handleError = (res: NextApiResponse<Data>, error: any) => {
  if (error instanceof Error)
    return res.status(400).json({ error: error.message });

  return res.status(500).json({ error: 'Internal Server Error' });
};

// Handler for retrieving a user by ID
export async function getUserByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const id = req.query.slug[1];

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid or missing user ID' });
  }

  try {
    const userResult = await queryUserbyId(id as string);
    if (!userResult) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      return res.status(200).json(userResult);
    }
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for retrieving a user by name
export async function getUserByNameHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = req.query.slug[1];

  if (!name || Array.isArray(name)) {
    return res.status(400).json({ error: 'Invalid or missing user name' });
  }

  try {
    const userResults = await queryUserbyName(name as string);
    return res.status(200).json(userResults);
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for creating a new user profile
export async function createUserProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    firstName = '',
    lastName = '',
    email = '',
    github = '',
    linkedin = '',
    skills = [],
  }: User = req.body;

  const user: User = {
    firstName,
    lastName,
    email,
    github,
    linkedin,
    skills,
    groups: [],
  };

  try {
    validateNewUser(user);
    const uid = req.user.uid; // Adjust based on how you're passing the UID
    if (!uid || Array.isArray(uid)) {
      return res.status(400).json({ error: 'Missing user UID' });
    }

    await createProfile(user, uid as string);
    return res.status(201).json({ message: 'User profile created!' });
  } catch (error) {
    handleError(res, error);
  }
}

// Handler for editing a user profile
export async function editUserProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, email, github, linkedin, skills }: User =
    req.body;

  const user: Partial<User> = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(email && { email }),
    ...(github && { github }),
    ...(linkedin && { linkedin }),
    ...(skills && { skills }),
  };


  try {
    validateEdit(user);
    const uid = req.user.uid; // Adjust based on how you're passing the UID
    if (!uid || Array.isArray(uid)) {
      return res.status(400).json({ error: 'Missing user UID' });
      return;
    }

    await editProfile(user, uid as string);
    return res.status(200).json({ message: 'User profile edited!' });
  } catch (error) {
    handleError(res, error);
  }
}
