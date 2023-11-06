import { db } from "../config/firebaseInit";
import { Post } from "../models/db";

export const createPost = async (
  post: Post,
  uid: string
): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(uid).create(post);
  } catch (error) {
    console.log(`Error creating document for ${uid}:`, error);
    throw error;
  }
};

export const editPost = async (
  post: Partial<Post>,
  uid: string
): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(uid).update(post);
  } catch (error) {
    console.log(`Error creating document for ${uid}:`, error);
    throw error;
  }
};
