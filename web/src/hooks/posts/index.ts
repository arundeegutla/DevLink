import { useQuery } from "@tanstack/react-query";
import { User as FirebaseUser } from "firebase/auth";

import * as models from "@/hooks/models";
import { http, generateRequestConfig } from "@/hooks/default";


async function createPost(user: FirebaseUser, post: {
  title: string,
  body: string,
  skillsWanted: string[]
}) {
  const config = await generateRequestConfig(user);
  return http.post(
    "/posts/createPost",
    {
      title: post.title,
      body: post.body,
      skillsWanted: post.skillsWanted
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


export function useCeatePost(user: FirebaseUser, post: {
  title: string,
  body: string,
  skillsWanted: string[]
}) {
  return useQuery({
    queryKey: ["createPost"],
    queryFn: async function () { createPost(user, post) }
  })
}


async function editPost(user: FirebaseUser, post: {
  title: string,
  body: string,
  skillsWanted: string[],
  postId: string
}) {
  const config = await generateRequestConfig(user);

  return http.put(
    "/posts/editPost",
    {
      title: post.title,
      body: post.body,
      postId: post.postId
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


export function useEditPost(user: FirebaseUser, post: {
  title: string,
  body: string,
  skillsWanted: string[],
  postId: string
}) {
  return useQuery({
    queryKey: ["editPost"],
    queryFn: async function () { editPost(user, post) }
  })
}


async function deletePost(user: FirebaseUser, postId: string) {
  const config = await generateRequestConfig(user);
  
  return http.delete(
    `/posts/deletePost/${encodeURIComponent(postId)}`,
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


export function useDeletePost(user: FirebaseUser, postId: string) {
  return useQuery({
    queryKey: ["deletePost"],
    queryFn: async function () { deletePost(user, postId) }
  })
}