import { db } from "../config/firebaseInit";
import { Group, User, UserPage, condensedGroup } from "../models/db";
import { DocumentReference } from "@google-cloud/firestore";

export const getUserDoc = async (uid: string): Promise<DocumentReference | undefined> => {
  try {
      const doc = await db.collection("Users").doc(uid).get();
      if (doc.exists) {
          return db.collection("Users").doc(uid);
      } else {
          return undefined;
      }
  } catch (error) {
      console.log("Error getting document:", error);
      throw error;
  }
};

export const queryUserbyId = async (
  queryID: string
): Promise<UserPage | undefined> => {
  try {
    const doc = await db.collection("Users").doc(queryID).get();
    if (doc.exists) {
      const userGroupsData = await Promise.all(
        doc.data()?.groups.map(async (groupRef) => {
          const groupDoc = await groupRef.get();
          if (groupDoc.exists) {
            const groupData = groupDoc.data() as Group;
            return {
              id: groupDoc.id,
              description: groupData.description,
              name: groupData.name,
            } as condensedGroup;
          } else return;
        })
      );
      return { ...doc.data(), groups: userGroupsData } as UserPage;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const queryUserbyName = async (
  queryName: string
): Promise<User[] | undefined> => {
  try {
    queryName = queryName.toLowerCase();

    const doc = await db
      .collection("Users")
      .where("LowerFirstName", ">=", `${queryName}`)
      .where("LowerFirstName", "<", `${queryName}` + "z")
      .get();

    const usersData = doc.docs.map((doc) => doc.data() as User);

    return usersData;
  } catch (error) {
    console.log("Error getting document:", error);
    throw error;
  }
};

export const createProfile = async (
  user: User,
  uid: string
): Promise<void | undefined> => {
  try {
    await db.collection("Users").doc(uid).create(user);
  } catch (error) {
    console.log(`Error creating document for ${uid}:`, error);
    throw error;
  }
};

export const editProfile = async (
  user: Partial<User>,
  uid: string
): Promise<void | undefined> => {
  try {
    await db.collection("Users").doc(uid).update(user);
  } catch (error) {
    console.log(`Error creating document for ${uid}:`, error);
    throw error;
  }
};
