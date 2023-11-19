import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "@/hooks/models";
import { http, generateRequestConfig } from "@/hooks/default";


async function createGroupRequest(user: FirebaseUser, group: {
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


export function createGroup(user: FirebaseUser, group: {
  name: string,
  description: string
}) {
  return useQuery({
    queryKey: ["createGroup"],
    queryFn: async function () { createGroupRequest(user, group) }
  })
}


async function editGroupRequest(user: FirebaseUser, group: {
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


export function editGroup(user: FirebaseUser, group: {
  name: string,
  description: string
}) {
  return useQuery({
    queryKey: ["editGroup"],
    queryFn: async function () { editGroupRequest(user, group) }
  })
}


async function joinGroupRequest(user: FirebaseUser, group: {
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


export function joinGroup(user: FirebaseUser, group: {
  groupId: string
}) {
  return useQuery({
    queryKey: ["joinGroup"],
    queryFn: async function () { joinGroupRequest(user, group) }
  })
}


async function handleRequestRequest(user: FirebaseUser, group: {
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


export function handleRequest(user: FirebaseUser, group: {
  groupId: string,
  accept: boolean,
  requestedUserId: string
}) {
  return useQuery({
    queryKey: ["handleRequest"],
    queryFn: async function () { handleRequestRequest(user, group) }
  })
}