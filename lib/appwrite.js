import { Client, Account, Avatars,Databases } from "react-native-appwrite";



export const client = new Client()
  .setProject("6843446f0010c870fdac")
  .setPlatform("com.kami.shelfie");

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases= new Databases(client)

// export { client, account, ID, avatars };