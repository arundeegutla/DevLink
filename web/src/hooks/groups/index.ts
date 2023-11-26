import { useMutation } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "@/hooks/models";
import { http, generateRequestConfig } from "@/hooks/default";


export async function createGroup(user: FirebaseUser, group: {
  name: string,
  description: string
}) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/groups/createGroup",
    {
      name: group.description,
      description: group.description
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


export function useCreateGroup() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser,
      group: {
        name: string,
        description: string
      }
    }) => createGroup(data.user, data.group)
  });
}


export async function editGroup(user: FirebaseUser, group: {
  name: string,
  description: string
}) {
  const config = await generateRequestConfig(user);
  return http.put(
    "/groups/editGroup",
    {
      name: group.description,
      description: group.description
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


export function useEditGroup() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser,
      group: {
        name: string,
        description: string
      }
    }) => editGroup(data.user, data.group)
  });
}


export async function joinGroup(user: FirebaseUser, groupId: string) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/groups/requestJoin",
    {
      groupId: groupId
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


export function useJoinGroup() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser,
      groupId: string
    }) => joinGroup(data.user, data.groupId)
  });
}


export async function handleRequest(user: FirebaseUser, group: {
  groupId: string,
  accept: boolean,
  requestedUserId: string
}) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/groups/handleJoinRequest",
    {
      groupId: group.groupId,
      accept: group.accept,
      requestedUserId: group.requestedUserId
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


export function useHandleRequest() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser,
      group: {
        groupId: string,
        accept: boolean,
        requestedUserId: string
      }
    }) => handleRequest(data.user, data.group)
  });
}