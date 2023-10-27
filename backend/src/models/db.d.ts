import { DocumentReference } from "@google-cloud/firestore";

export type User = {
  connections: DocumentReference[];
  contactInfo: { email: string; github: string };
  firstName: string;
  lastName: string;
  groups: DocumentReference[];
  skills: string[];
};
