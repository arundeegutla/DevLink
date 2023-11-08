import { db } from "../config/firebaseInit";
import { Group } from "../models/db";

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
    console.log(`Error creating document for ${groupId}:`, error);
    throw error;
  }
};
