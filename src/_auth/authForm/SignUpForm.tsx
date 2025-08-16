
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type z from "zod";
import { signUpFormSchema } from "@/_lib/validations";
import { Loader } from "@/components/custom/Loader";
import { Link } from "react-router-dom";
import { createNewUserAccount } from "@/_lib/appwrite/api";



const SignUpForm = () => {
    const isLoading = false ;
    // 1. define your form
    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        }
    });

    // 2. Define a submit handler
    async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
        const newUser = await createNewUserAccount(values)
        console.log(newUser);
        
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <div className="flex-center w-14 h-14">
                    <img src="Assets/images/fav_icon.png" alt="logo" className="" />
                    <h2 className="h3-bold text-light-3">BlinkUp</h2>
                </div>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">Create a new account</h2>
                <p className="text-light-3 small-mdeium md:base-regular mt-2">To use BlinkUp, please create an account</p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input rounded-2xl" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>userName</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input rounded-2xl" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input rounded-2xl" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input rounded-2xl" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary rounded-3xl">
                        {isLoading ? (
                            <div className="flex-center gap-2">
                               <Loader /> Loading...
                            </div>
                        ) : "Sign up"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Login</Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}

export default SignUpForm;