import { DocumentReference } from "@google-cloud/firestore";

export type User = {
  Connections: DocumentReference[];
  ContactInfo: { Email: string; Github: string };
  FirstName: string;
  LastName: string;
  Groups: DocumentReference[];
  Skills: string[];
};
