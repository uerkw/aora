import "react-native-url-polyfill/auto";

export const appwriteConfig = {
  projectId: process.env["EXPO_PUBLIC_APPWRITE_PROJECT_ID"],
  databaseId: process.env["EXPO_PUBLIC_APPWRITE_DATABASE_ID"],
  userCollectionId: process.env["EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID"],
  videoCollectionId: process.env["EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID"],
  storageId: process.env["EXPO_PUBLIC_APPWRITE_STORAGE_ID"],
  endpoint: process.env["EXPO_PUBLIC_APPWRITE_ENDPOINT"],
  platform: process.env["EXPO_PUBLIC_APPWRITE_PLATFORM"],
};

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId!) // Your project ID
  .setPlatform(appwriteConfig.platform!); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error("User not created from appwrite");

    const avatarUrl = avatars.getInitials(username);

    await signInUser(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    if (!newUser) throw Error("User not created in database");

    return newUser;
  } catch (error: string | unknown) {
    console.log(error);
    throw new Error("User not created");
  }
};

export async function signInUser(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error("User not signed in");
    return session;
  } catch (error: string | unknown) {
    console.log(error);
    throw new Error("User not signed in");
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error("Account not found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error("User not signed in");
  } catch (error: string | unknown) {
    console.log(error);
    return null;
  }

  return;
};
