import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "@/hooks/models";
import { http, generateRequestConfig } from "@/hooks/default";


async function createGroup(user: FirebaseUser, group: {
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


export function useCreateGroup(user: FirebaseUser, group: {
  name: string,
  description: string
}) {
  return useQuery({
    queryKey: ["createGroup"],
    queryFn: async function () { createGroup(user, group) }
  })
}


async function editGroup(user: FirebaseUser, group: {
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


export function useEditGroup(user: FirebaseUser, group: {
  name: string,
  description: string
}) {
  return useQuery({
    queryKey: ["editGroup"],
    queryFn: async function () { editGroup(user, group) }
  })
}


async function joinGroup(user: FirebaseUser, group: {
  groupId: string
}) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/groups/requestJoin",
    {
      groupId: group.groupId
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


export function useJoinGroup(user: FirebaseUser, group: {
  groupId: string
}) {
  return useQuery({
    queryKey: ["joinGroup"],
    queryFn: async function () { joinGroup(user, group) }
  })
}


async function handleRequest(user: FirebaseUser, group: {
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


export function useHandleRequest(user: FirebaseUser, group: {
  groupId: string,
  accept: boolean,
  requestedUserId: string
}) {
  return useQuery({
    queryKey: ["handleRequest"],
    queryFn: async function () { handleRequest(user, group) }
  })
}