import { useMutation, useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "../hooks/model";
import { http, generateRequestConfig } from "../hooks/default";

export async function createProfile(user: FirebaseUser, profile: {
  firstName: string,
  lastName: string,
  email: string,
  github: string,
  linkedin: string,
  skills: string[],
}) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/users/createProfile",
    profile,
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


export function useCreateProfile() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser,
      profile: {
        firstName: string,
        lastName: string,
        email: string,
        github: string,
        linkedin: string,
        skills: string[],
      }
    }) => createProfile(data.user, data.profile)
  })
}