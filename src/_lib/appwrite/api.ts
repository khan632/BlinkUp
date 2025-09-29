import type { NewUserType } from "@/types";
import { account, appwriteConfig, avatars, database } from "./config";
import { ID, Query } from "appwrite";


// ========================= SIGN-UP ===================================

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
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        })

        return newUser;    
    } catch (error) {
        console.log(error);
        return error;
    }
}


// ========================= SAVE USER TO DB =================================
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


// ========================== SIGN-IN USER =================================
export async function signInAccount(user: {
    email: string;
    password: string
}) {
    console.log(user, "user");
    try {
        // If a session is already active, Appwrite will throw user_session_already_exists.
        // We proactively try to clear any existing current session, then create a new one.
        try {
            await account.deleteSession('current');
        } catch (_) {
            // ignore if no active session
        }

        try {
            const session = await account.createEmailSession(user.email, user.password);
            return session;
        } catch (err: any) {
            // If a session still exists (race condition), clear and retry once.
            if (err?.type === 'user_session_already_exists' || err?.code === 401) {
                try {
                    await account.deleteSession('current');
                } catch (_) {
                    // ignore
                }
                const session = await account.createEmailSession(user.email, user.password);
                return session;
            }
            console.log(err);
            throw err;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        console.log(error);
        
    }
}

// =========================== GET USER ===========================
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);

    }
}