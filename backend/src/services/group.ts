import { group } from "console";
import { db } from "../config/firebaseInit";
import { Group } from "../models/db";
import { DocumentReference, FieldValue } from "@google-cloud/firestore";

export const acceptUser = async (userId: string, groupId: string): Promise<void | undefined> => {
  try {
    const groupDoc = await db.collection("Groups").doc(groupId).get();
    if (groupDoc.exists) {
      const groupData = groupDoc.data() as Group;
      await db.collection("Groups").doc(groupId).update({
        members: FieldValue.arrayUnion(db.collection("Users").doc(userId)),
        userQueue: FieldValue.arrayRemove(db.collection("Users").doc(userId))
      });
    } else {
      throw Error("No such group");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const rejectUser = async (userId: string, groupId: string): Promise<void | undefined> => {
  try {
    const groupDoc = await db.collection("Groups").doc(groupId).get();
    if (groupDoc.exists) {
      const groupData = groupDoc.data() as Group;
      await db.collection("Groups").doc(groupId).update({
        userQueue: FieldValue.arrayRemove(db.collection("Users").doc(userId))
      });
    } else {
      throw Error("No such group");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const requestGroupJoin = async (groupId: string, userReference: DocumentReference): Promise<string | undefined> => {
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
      if (errMsg !== "")
        return errMsg;

      await db.collection("Groups").doc(groupId).update({
        userQueue: FieldValue.arrayUnion(userReference)
      });
    } else {
      throw Error("No such group");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
  return "";
}

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
}

export const createGroup = async (
  group: Group
): Promise<void | undefined> => {
  try {
    await db.collection("Groups").doc().create(group);
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
