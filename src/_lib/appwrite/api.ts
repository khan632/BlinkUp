import type { NewUserType } from "@/types";
import { account } from "./config";
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
        return newAccount;    
    } catch (error) {
        console.log(error);
        return error;
    }
}