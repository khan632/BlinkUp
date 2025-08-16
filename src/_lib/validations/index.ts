import * as z from "zod";

export const signUpFormSchema = z.object({
    name: z.string().min(5, { message: "Name must be at least 5 characters long" }).max(50),
    username: z.string().min(5, { message: "Username must be at least 5 characters long" }).max(50),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})