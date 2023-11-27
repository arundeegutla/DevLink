import { Request, Response, NextFunction } from "express";
import { createPost, editPost, deletePost, getPostUserOwner, getPostByFilter, getPostById } from "../services/post";
import { Post } from "../models/db";
import { validateNewPost, validateEdit } from "../utils/post";
import { getGroupOwner, groupWithIdExists } from "../services/group";


export const createInitialPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title = "", body = "", groupId = "", skillsWanted = [] } = req.body;
  if (groupId === "") {
    res.status(403).send({ error: "Not assigned group" });
    return;
  }
  
  try {
    const groupExists: boolean = await groupWithIdExists(groupId);
    if (!groupExists) {
      res.status(404).send({ error: "Group does not exist" });
      return;
    }
  } catch (error) {
    next(error);
  }

  try {
    if (res.locals.user.uid !== await getGroupOwner(groupId)) {
      res.status(403).send({ error: "User is not owner of group" });
      return;
    }
  } catch (error) {
    next(error);
  }
  
  const post: Partial<Post> = { title, body, skillsWanted};

  // Validates request body
  try {
    validateNewPost(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }
  try {
    await createPost(post, groupId);
    res.send({ message: "Post created!" });
  } catch (error) {
    next(error);
  }
};

export const editExistingPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, body, skillsWanted, postId } = req.body;

  // Checks for undefined and inserts them into user object
  const post: Partial<Post> = {
    ...(title && { title }),
    ...(body && { body }),
    ...(skillsWanted && { skillsWanted })
  };
  try {
    validateEdit(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
    return;
  }

  try {
    await editPost(post, postId);
    res.send({ message: "Post edited!" });
  } catch (error) {
    next(error);
  }
};

export const deleteExistingPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId = "" } = req.body;

  // Checks for undefined and inserts them into user object
  if (postId === "") {
    res.status(400);
    return;
  }
  try {
    if (res.locals.user.uid !== await getPostUserOwner(postId)) {
      res.status(403).send({ error: "User is not owner of post" });
      return;
    }
  } catch (error) {
    next(error);
  }

  try {
    await deletePost(postId);
    res.send({ message: "Post deleted!" });
  } catch (error) {
    next(error);
  }
};

export const retreivePostData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId: string = req.params.id;

  if (postId === "") {
    res.status(400);
    return;
  }

  try {
    const post = await getPostById(postId);
    res.send(post);
  } catch (error) {
    if (error?.message === "Post does not exist") {
      res.status(404).send({ error: error.message });
      return;
    }
    next(error);
  }
}

export const searchExistingPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { queryFilters } = req.body;
  try {
    const postResult: Post[] = await getPostByFilter(queryFilters);
    res.send(postResult);
  } catch (error) {
    next(error);
  }
};