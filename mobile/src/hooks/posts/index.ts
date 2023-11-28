import { useMutation, useQuery } from '@tanstack/react-query';
import { User as FirebaseUser } from 'firebase/auth';

import * as models from '@/hooks/models';
import { http, generateRequestConfig } from '@/hooks/default';

export async function createPost(
  user: FirebaseUser,
  post: {
    groupId: string;
    title: string;
    body: string;
    skillsWanted: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post('/posts/createPost', post, config)
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

export function useCreatePost() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      post: {
        groupId: string;
        title: string;
        body: string;
        skillsWanted: string[];
      };
    }) => createPost(data.user, data.post),
  });
}

export async function editPost(
  user: FirebaseUser,
  post: {
    title: string;
    body: string;
    skillsWanted: string[];
    postId: string;
  }
) {
  const config = await generateRequestConfig(user);

  return http
    .put('/posts/editPost', post, config)
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

export function useEditPost() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      post: {
        title: string;
        body: string;
        skillsWanted: string[];
        postId: string;
      };
    }) => editPost(data.user, data.post),
  });
}

export async function deletePost(user: FirebaseUser, postId: string) {
  const config = await generateRequestConfig(user);

  return http
    .post(
      `/posts/deletePost`,
      {
        postId: postId,
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

export function useDeletePost() {
  return useMutation({
    mutationFn: (data: { user: FirebaseUser; postId: string }) =>
      deletePost(data.user, data.postId),
  });
}

export async function getPost(user: FirebaseUser, postId: string) {
  const config = await generateRequestConfig(user);
  return http
    .get(`/posts/get/${encodeURIComponent(postId)}`, config)
    .then((res) => {
      if (res.status !== 200) {
        return null;
      }
    return res.data as models.Post;
  }).catch(err => {
    return null;
  });
}

export function useGetPost(user: FirebaseUser, postId: string) {
  return useQuery({
    queryKey: ["getPost", postId],
    queryFn: () => getPost(user, postId)
  })
}

export async function searchPost(user: FirebaseUser, filter: string[]) {
  const filterQuery = filter.map(f => `filter=${encodeURIComponent(f)}`).join("&")

  const config = await generateRequestConfig(user);
  return http.get(
    `/posts/search?${filterQuery}`,
    config
  ).then(res => {
    if (res.status !== 200) {
      return null;
    }

    return res.data as models.Post[];
  }).catch(err => {
    return null;
  });
}


export function useSearchPost(user: FirebaseUser, filter: string[]) {
  return useQuery({
    queryKey: ["searchPost", filter],
    queryFn: () => searchPost(user, filter)
  })
}