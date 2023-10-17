// Example Code
import { db } from "../config/firebaseInit";

export const throwError = () => {
  const error: any = new Error("broken");
  error.status = 401;
  throw error;
};

export const dbTest = async () => {
  console.log(db.collection('Users'));
};
