import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

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
    const redirectUri = Linking.createURL("/"); // ./ means pointing to the HOme page
    //Now once we have the redirect URI that we want to redirect back to we have to request and oAuth token from appwrite using the Google provider
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Failed to login error 1");

    //Now for a login redirect pop up
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Failed to login error 2");

    //if success then we can parse the newly returned URL to extract the query parametes by saying:
    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login error 3");
    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const response = await account.get();
    await account.deleteSession("current");
    console.log("logging out", response.email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//function to fetch the info of currently logged in user
export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      //then generate a avatar
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
