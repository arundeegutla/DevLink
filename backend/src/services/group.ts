import { group } from "console";
import { db } from "../config/firebaseInit";
import { Group, User, condensedUser, Post, GroupPage } from "../models/db";
import { DocumentReference, FieldValue } from "@google-cloud/firestore";
import { addGrouptoUser } from "./user";

export const groupWithIdExists = async (groupId: string): Promise<boolean> => {
  try {
    const docRef: DocumentReference = await db
      .collection("Groups")
      .doc(groupId);
    const data = await docRef.get();
    return data.exists ? true : false;
  } catch (error) {
    throw error;
  }
};

export const getGroupById = async (
  groupId: string
): Promise<GroupPage | undefined> => {
  try {
    const doc = await db.collection("Groups").doc(groupId).get();
    if (doc.exists) {
      const groupMembersData = await Promise.all(
        doc.data()?.members.map(async (userRef) => {
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data() as User;
            return {
              id: userDoc.id,
              firstName: userData.firstName,
              lastName: userData.lastName,
            } as condensedUser;
          } else return;
        })
      );

      const groupPostData = await Promise.all(
        doc.data()?.posts.map(async (postRef) => {
          const postDoc = await postRef.get();
          if (postDoc.exists) {
            const postData = postDoc.data() as Post;
            return {
              id: postDoc.id,
              title: postData.title,
              body: postData.body,
              skillsWanted: postData.skillsWanted,
            };
          } else return;
        })
      );

      return {
        ...doc.data(),
        members: groupMembersData,
        posts: groupPostData,
        owner: doc.data()?.owner.id,
      } as GroupPage;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const acceptUser = async (
  userId: string,
  groupId: string
): Promise<void | undefined> => {
  try {
    const groupDoc = await db.collection("Groups").doc(groupId).get();
    if (groupDoc.exists) {
      const groupData = groupDoc.data() as Group;
      await db
        .collection("Groups")
        .doc(groupId)
        .update({
          members: FieldValue.arrayUnion(db.collection("Users").doc(userId)),
          userQueue: FieldValue.arrayRemove(db.collection("Users").doc(userId)),
        });
    } else {
      throw Error("No such group");
    }
    addGrouptoUser(groupId, userId);
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const rejectUser = async (
  userId: string,
  groupId: string
): Promise<void | undefined> => {
  try {
    const groupDoc = await db.collection("Groups").doc(groupId).get();
    if (groupDoc.exists) {
      const groupData = groupDoc.data() as Group;
      await db
        .collection("Groups")
        .doc(groupId)
        .update({
          userQueue: FieldValue.arrayRemove(db.collection("Users").doc(userId)),
        });
    } else {
      throw Error("No such group");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const requestGroupJoin = async (
  groupId: string,
  userReference: DocumentReference
): Promise<string | undefined> => {
  try {
    const groupDoc = await db.collection("Groups").doc(groupId).get();
    if (groupDoc.exists) {
      const groupData = groupDoc.data() as Group;

      let errMsg: string = "";
      groupData.userQueue.forEach((user) => {
        if (user.isEqual(userReference)) {
          errMsg = "User already in queue";
        }
      });
      groupData.members.forEach((user) => {
        if (user.isEqual(userReference)) {
          errMsg = "User already a member";
        }
      });
      if (errMsg !== "") return errMsg;

      await db
        .collection("Groups")
        .doc(groupId)
        .update({
          userQueue: FieldValue.arrayUnion(userReference),
        });
    } else {
      throw Error("No such group");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
  return "";
};

export const getGroupOwner = async (groupId: string): Promise<string> => {
  try {
    const doc = await db.collection("Groups").doc(groupId).get();
    if (doc.exists) {
      const groupData = doc.data() as Group;
      return groupData.owner.id;
    } else {
      return "";
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const createGroup = async (group: Group): Promise<string> => {
  try {
    const res = await db.collection("Groups").add(group);
    return res.id;
  } catch (error) {
    console.log("Error creating document", error);
    throw error;
  }
};

export const editGroup = async (
  group: Partial<Group>,
  groupId: string
): Promise<void | undefined> => {
  try {
    await db.collection("Groups").doc(groupId).update(group);
  } catch (error) {
    console.log(`Error editing document for ${groupId}:`, error);
    throw error;
  }
};
