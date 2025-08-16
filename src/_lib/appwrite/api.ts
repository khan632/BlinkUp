import type { NewUserType } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export async function createNewUserAccount(user: NewUserType) {
    try {
        const newUser = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        return newUser;    
    } catch (error) {
        console.log(error);
        return error;
    }
}