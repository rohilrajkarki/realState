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
    const redirectUri = Linking.createURL("./"); // ./ means pointing to the HOme page
    //Now once we have the redirect URI that we want to redirect back to we have to request and oAuth token from appwrite using the Google provider
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Failed to login");

    //Now for a login redirect pop up
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success") throw new Error("Failed to login");

    //if success then we can parse the newly returned URL to extract the query parametes by saying:
    const url = new URL(browserResult.url);
  } catch (error) {
    console.log(error);
    return false;
  }
}
