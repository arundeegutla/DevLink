import { db } from "../config/firebaseInit";
import { Group } from "../models/db";

export const createGroup = async (
  group: Group,
  uid: string
): Promise<void | undefined> => {
  try {
    await db.collection("Groups").doc(uid).create(group);
  } catch (error) {
    console.log(`Error creating document for ${uid}:`, error);
    throw error;
  }
};

export const editGroup = async (
  group: Partial<Group>,
  uid: string
): Promise<void | undefined> => {
  try {
    await db.collection("Groups").doc(uid).update(group);
  } catch (error) {
    console.log(`Error creating document for ${uid}:`, error);
    throw error;
  }
};
