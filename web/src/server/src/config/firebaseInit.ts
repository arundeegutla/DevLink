import * as admin from 'firebase-admin';
import { env } from './env';

// TODO: Replace the following with your app's Firebase project configuration
const serviceAccount = JSON.parse(env.SERVICE_ACCOUNT);

let temp;
if (!admin.apps.length) {
  temp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  temp = admin.app();
}

export const fb = temp;
export const db = admin.firestore();
