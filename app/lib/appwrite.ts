import { Account, Avatars, Client } from "react-native-appwrite";
import * as Linking from "expo-linking";

//setup out appwrite client

export const config = {
  platform: "com.real.state",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  //Using expo linking to handling deep links and redirect URLs
  try {
    const redirectUri = Linking.createURL();
  } catch (error) {
    console.log(error);
    return false;
  }
}
