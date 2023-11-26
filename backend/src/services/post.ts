import { db } from "../config/firebaseInit";
import { Post, Group, condensedGroup, PostPage } from "../models/db";
import { DocumentReference, FieldValue } from "@google-cloud/firestore";



export const getPostById = async (
  postId: string
): Promise<Post | undefined> => {
  try {
    const doc = await db.collection("Posts").doc(postId).get();
    if (doc.exists) {
      const groupRef = doc.data()?.owner;
      const groupDoc = await groupRef.get();
      let groupData;
      if (groupDoc.exists) {
        const group = groupDoc.data() as Group;
        groupData = {
          id: groupDoc.id,
          name: group.name,
          description: group.description,
          color: group.color
        } as condensedGroup;
      }
      return { ...doc.data(), owner: groupData } as PostPage;
    } else {
      throw new Error("Post does not exist");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const createPost = async (
  post: Partial<Post>,
  groupId: string
): Promise<void | undefined> => {
  try {
    const groupRef: DocumentReference = db.collection("Groups").doc(groupId);
    const newPost = await db.collection("Posts").add({...post, owner: groupRef});
    groupRef.update({
      posts: FieldValue.arrayUnion(db.collection("Posts").doc(newPost.id))
    });
  } catch (error) {
    console.log("Error creating document", error);
    throw error;
  }
};

export const editPost = async (
  post: Partial<Post>,
  postId: string
): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(postId).update(post);
  } catch (error) {
    console.log(`Error editing document for ${postId}:`, error);
    throw error;
  }
};

export const deletePost = async (
  postId: string
): Promise<void | undefined> => {
  try {
    await db.collection("Posts").doc(postId).delete();
  } catch (error) {
    console.log(`Error deleteing document for ${postId}:`, error);
    throw error;
  }
};

export const getPostUserOwner = async (
  postId: string
): Promise<string> => {
  try {
    const doc = await db.collection("Posts").doc(postId).get();
    if (doc.exists) {
      const postData = doc.data() as Post;
      const postGroup = await postData.owner.get();
      if (postGroup.exists) {
        const groupData = postGroup.data() as Group;
        return groupData.owner.id;
      }
    } else {
      return "";
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};
