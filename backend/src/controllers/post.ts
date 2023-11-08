import { Request, Response, NextFunction } from "express";
import { createPost, editPost } from "../services/post";
import { Post } from "../models/db";
import { validateNewPost, validateEdit } from "../utils/post";

export const createInitialPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title = "", body = "" }: Post = req.body;
  const post: Post = { title, body, postId: "", owner: [], skillsWanted: []};

  // Validates request body
  try {
    validateNewPost(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
  try {
    await createPost(post);
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
  const { title, body, postId }: Post = req.body;

  // Checks for undefined and inserts them into user object
  const post: Partial<Post> = {
    ...(title && { title }),
    ...(body && { body }),
  };
  try {
    validateEdit(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

  try {
    await editPost(post, postId);
    res.send({ message: "Post edited!" });
  } catch (error) {
    next(error);
  }
};
