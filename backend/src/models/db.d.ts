import { DocumentReference } from "@google-cloud/firestore";

export type User = {
  contactInfo: contactInfo;
  firstName: string;
  lastName: string;
  groups: DocumentReference[];
  skills: string[];
};

export type contactInfo = {
  email: string;
  github: string;
};
