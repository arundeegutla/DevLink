import axios from "axios";
import { User } from "firebase/auth"

export const http = axios.create({
  baseURL: "https://api.thedevlink.com",
  headers: {
    "Content-type": "application/json"
  }
});

export async function generateRequestConfig(user: User) {
  const jwt = (await user.getIdTokenResult()).token;
  return {
    headers: {
      Authorization: "Bearer " + jwt
    }
  };
}