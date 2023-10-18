// Example Code
import { db } from "../config/firebaseInit";

export const throwError = () => {
  const error: any = new Error("broken");
  error.status = 401;
  throw error;
};

export const dbTest = async () => {
  const firstName = "Michael";
  const q = await db.collection("Users")
          .where("FirstName", ">=", `${firstName}`)
          .where("FirstName", "<=", `${firstName}` + "z")
          .get();

  console.log(q.docs.map(doc => doc.data()))
};