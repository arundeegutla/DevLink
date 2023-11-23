import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "@/hooks/models";
import { http, generateRequestConfig } from "@/hooks/default";


async function searchUser(user: FirebaseUser, searchQuery: string) {
  const config = await generateRequestConfig(user);
  return http.get(
    `/users/search/${encodeURIComponent(searchQuery)}`,
    config
  ).then(res => {
    if (res.status !== 200) {
      return undefined;
    }

    return res.data as models.User;
  }).catch(err => {
    return undefined;
  });
}


export function useSearchUser(user: FirebaseUser, searchQuery: string) {
  return useQuery({
    queryKey: ["searchUser"],
    queryFn: async function () { searchUser(user, searchQuery) }
  })
}


async function getById(user: FirebaseUser, userId: string) {
  const config = await generateRequestConfig(user);
  return http.get(
    `/users/get/${encodeURIComponent(userId)}`,
    config
  ).then(res => {
    if (res.status !== 200) {
      return undefined;
    }

    return res.data as models.User;
  }).catch(err => {
    return undefined;
  });
}


export function useGetById(user: FirebaseUser, userId: string) {
  return useQuery({
    queryKey: ["getById"],
    queryFn: async function () { getById(user, userId) }
  })
}


async function createProfile(user: FirebaseUser, profile: {
  email: string;
  github: string;
  firstName: string;
  lastName: string;
  skills: string[];
}) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/users/createProfile",
    {
      email: profile.email,
      github: profile.github,
      firstName: profile.firstName,
      lastName: profile.lastName,
      skills: profile.skills
    },
    config
  ).then(res => {
    if (res.status !== 200) {
      return false;
    }

    return true;
  }).catch(err => {
    return false;
  });
}


export function useCreateProfile(user: FirebaseUser, profile: {
  email: string;
  github: string;
  firstName: string;
  lastName: string;
  skills: string[];
}) {
  return useQuery({
    queryKey: ["createProfile"],
    queryFn: async function () { createProfile(user, profile) }
  })
}


async function editProfile(user: FirebaseUser, profile: {
  email: string;
  github: string;
  firstName: string;
  lastName: string;
  skills: string[];
}) {
  const config = await generateRequestConfig(user);
  return http.put(
    "/users/editProfile",
    {
      email: profile.email,
      github: profile.github,
      firstName: profile.firstName,
      lastName: profile.lastName,
      skills: profile.skills
    },
    config
  ).then(res => {
    if (res.status !== 200) {
      return false;
    }

    return true;
  }).catch(err => {
    return false;
  });
}


export function useEditProfile(user: FirebaseUser, profile: {
  email: string;
  github: string;
  firstName: string;
  lastName: string;
  skills: string[];
}) {
  return useQuery({
    queryKey: ["editProfile"],
    queryFn: async function () { editProfile(user, profile) }
  })
}