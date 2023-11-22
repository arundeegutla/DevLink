import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "@/hooks/models";
import { http, generateRequestConfig } from "@/hooks/default";


async function searchUserRequest(user: FirebaseUser, searchQuery: string) {
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


export function searchUser(user: FirebaseUser, searchQuery: string) {
  return useQuery({
    queryKey: ["searchUser"],
    queryFn: async function () { searchUserRequest(user, searchQuery) }
  })
}


async function getByIdRequest(user: FirebaseUser, userId: string) {
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


export function getById(user: FirebaseUser, userId: string) {
  return useQuery({
    queryKey: ["getById"],
    queryFn: async function () { getByIdRequest(user, userId) }
  })
}


async function createProfileRequest(user: FirebaseUser, profile: {
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


export function createProfile(user: FirebaseUser, profile: {
  email: string;
  github: string;
  firstName: string;
  lastName: string;
  skills: string[];
}) {
  return useQuery({
    queryKey: ["createProfile"],
    queryFn: async function () { createProfileRequest(user, profile) }
  })
}


async function editProfileRequest(user: FirebaseUser, profile: {
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


export function editProfile(user: FirebaseUser, profile: {
  email: string;
  github: string;
  firstName: string;
  lastName: string;
  skills: string[];
}) {
  return useQuery({
    queryKey: ["editProfile"],
    queryFn: async function () { editProfileRequest(user, profile) }
  })
}