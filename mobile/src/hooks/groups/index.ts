import { useMutation, useQuery } from '@tanstack/react-query';
import { User as FirebaseUser } from 'firebase/auth';

import * as models from '../models';
import { http, generateRequestConfig } from '../default';

export async function createGroup(
  user: FirebaseUser,
  group: {
    name: string;
    description: string;
    color: string;
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post('/groups/createGroup', group, config)
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

export function useCreateGroup() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      group: {
        name: string;
        description: string;
        color: string;
      };
    }) => createGroup(data.user, data.group),
  });
}

export async function editGroup(
  user: FirebaseUser,
  group: {
    groupId: string;
    name: string;
    description: string;
    color: string;
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .put('/groups/editGroup', group, config)
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

export function useEditGroup() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      group: {
        groupId: string;
        name: string;
        description: string;
        color: string;
      };
    }) => editGroup(data.user, data.group),
  });
}

export async function joinGroup(user: FirebaseUser, groupId: string) {
  const config = await generateRequestConfig(user);
  return http
    .post(
      '/groups/requestJoin',
      {
        groupId: groupId,
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

export function useJoinGroup() {
  return useMutation({
    mutationFn: (data: { user: FirebaseUser; groupId: string }) =>
      joinGroup(data.user, data.groupId),
  });
}

export async function handleRequest(
  user: FirebaseUser,
  group: {
    groupId: string;
    accept: boolean;
    requestedUserId: string;
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post('/groups/handleJoinRequest', group, config)
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

export function useHandleRequest() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      group: {
        groupId: string;
        accept: boolean;
        requestedUserId: string;
      };
    }) => handleRequest(data.user, data.group),
  });
}

// TODO
export async function getGroup(user: FirebaseUser, groupId: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/groups/get/${encodeURIComponent(groupId)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }
    return res.data as models.Group;
  }).catch(err => {
    return null;
  });
}

export function useGetGroup(user: FirebaseUser, groupId: string) {
  return useQuery({
    queryKey: ['getGroup', groupId],
    queryFn: () => getGroup(user, groupId),
  });
}
