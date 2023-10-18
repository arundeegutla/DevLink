import { db } from "../config/firebaseInit";
import { User } from "../models/db";

export const queryUserbyId = async (queryID: string): Promise<User | undefined> => {
    try {
        const doc = await db.collection("Users").doc(queryID).get();
        if (doc.exists) {
            console.log("Document data:", doc.data());
            return doc.data() as User;
        } else {
            console.log("No such document!");
            return undefined;
        }
    } catch (error) {
        console.log("Error getting document:", error);
        throw error;
    }
};

export const queryUserbyName = async (queryName: string): Promise<User[] | undefined> => {
    try {
        queryName = queryName.toLowerCase();

        const doc = await db.collection("Users")
        .where("LowerFirstName", ">=", `${queryName}`)
        .where("LowerFirstName", "<", `${queryName}` + "z")
        .get();

        const usersData = doc.docs.map(doc => doc.data() as User);

        return usersData;
    } catch (error) {
        console.log("Error getting document:", error);
        throw error;
    }
};
