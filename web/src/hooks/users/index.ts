import { User } from 'firebase/auth';
import * as models from '@/hooks/models';
import { http, generateRequestConfig } from '@/hooks/default';

export async function searchUser(user: User, searchQuery: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/users/search/${encodeURIComponent(searchQuery)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return [];
      }
      return res.data as models.User;
    })
    .catch((err) => {
      return [];
    });
}

export async function getUserById(user: User, userId: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/users/get/${encodeURIComponent(userId)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return undefined;
      }
      return res.data as models.User;
    })
    .catch((err) => {
      return undefined;
    });
}

export async function createProfile(
  user: User,
  profile: {
    email: string;
    github: string;
    firstName: string;
    lastName: string;
    skills: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post(
      '/users/createProfile',
      {
        email: profile.email,
        github: profile.github,
        firstName: profile.firstName,
        lastName: profile.lastName,
        skills: profile.skills,
      },
      config
    )
    .then((res) => {
      if (res.status !== 200) {
        return false;
      }

      return true;
    })
    .catch((err) => {
      return false;
    });
}

export async function editProfile(
  user: User,
  profile: {
    email: string;
    github: string;
    firstName: string;
    lastName: string;
    skills: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .put(
      '/users/editProfile',
      {
        email: profile.email,
        github: profile.github,
        firstName: profile.firstName,
        lastName: profile.lastName,
        skills: profile.skills,
      },
      config
    )
    .then((res) => {
      if (res.status !== 200) {
        return false;
      }

      return true;
    })
    .catch((err) => {
      return false;
    });
}
