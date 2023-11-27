import { useMutation } from '@tanstack/react-query';
import { User as FirebaseUser } from 'firebase/auth';

import * as models from '@/hooks/models';
import { http, generateRequestConfig } from '@/hooks/default';

export async function createPost(
  user: FirebaseUser,
  post: {
    title: string;
    body: string;
    skillsWanted: string[];
  }
) {
  const config = await generateRequestConfig(user);
  return http
    .post(
      '/posts/createPost',
      {
        title: post.title,
        body: post.body,
        skillsWanted: post.skillsWanted,
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

export function useCreatePost() {
  return useMutation({
    mutationFn: (data: {
      user: FirebaseUser;
      post: {
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
    .put(
      '/posts/editPost',
      {
        title: post.title,
        body: post.body,
        postId: post.postId,
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
    .delete(`/posts/deletePost/${encodeURIComponent(postId)}`, config)
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
