import { useMutation, useQuery } from '@tanstack/react-query';
import { User as FirebaseUser } from 'firebase/auth';

import * as models from '@/hooks/models';
import { http, generateRequestConfig } from '@/hooks/default';
import { fstorage } from '@/firebase/clientApp';
import { getDownloadURL, ref } from 'firebase/storage';
import { useState } from 'react';

export const defaultImageURL =
  'https://www.tech101.in/wp-content/uploads/2018/07/blank-profile-picture.png';

export async function searchUser(user: FirebaseUser, searchQuery: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/users/search/${encodeURIComponent(searchQuery)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }

      return res.data as models.User;
    })
    .catch((err) => {
      return null;
    });
}

export function useSearchUser(user: FirebaseUser, searchQuery: string) {
  return useQuery({
    queryKey: ['searchUser', searchQuery],
    queryFn: () => searchUser(user, searchQuery),
  });
}

export async function getUser(user: FirebaseUser, userId: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/users/get/${encodeURIComponent(userId)}`, config)
    .then((res) => {
      if (res.status !== 200) return null;
      return res.data as models.User;
    })
    .catch((err) => {
      return null;
    });
}

export function useGetUser(user: FirebaseUser, userId: string) {
  return useQuery({
    queryKey: ['getUser', userId],
    queryFn: () => getUser(user, userId),
  });
}

export async function createProfile(
  user: FirebaseUser,
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedin: string;
    skills: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post('/users/createProfile', profile, config)
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

export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      profile: {
        firstName: string;
        lastName: string;
        email: string;
        github: string;
        linkedin: string;
        skills: string[];
      };
    }) => createProfile(data.user, data.profile),
  });
}

export async function editProfile(
  user: FirebaseUser,
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    github: string;
    linkedin: string;
    skills: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .put('/users/editProfile', profile, config)
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

export function useEditProfile() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      profile: {
        firstName: string;
        lastName: string;
        email: string;
        github: string;
        linkedin: string;
        skills: string[];
      };
    }) => editProfile(data.user, data.profile),
  });
}

export const photoURLCache: Record<string, string> = {};
export async function getPhotoURL(id: string) {
  if (photoURLCache[id]) {
    return photoURLCache[id];
  }
  const fileRef = ref(fstorage, id + '.png');
  const url = await getDownloadURL(fileRef).catch(() => {
    return defaultImageURL;
  });
  console.log(url);
  photoURLCache[id] = url;
  return url;
}
