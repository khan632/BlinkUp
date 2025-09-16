import type { NewUserType } from "@/types";
import { account, appwriteConfig, avatars, database } from "./config";
import { ID } from "appwrite";

export async function createNewUserAccount(user: NewUserType) {
    console.log(ID.unique(), "data");
    
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw new Error("Failed to create account");

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: user.name,
            email: user.email,
            imageUrl: avatarUrl,
            username: user.username
        })

        return newUser;    
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    name: string,
    email: string,
    imageUrl: URL,
    username?: string
}) {
    try {
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.log(error);
        
    }
}

export async function signInAccount(user: {
    email: string;
    password: string
}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error);
        
    }

}