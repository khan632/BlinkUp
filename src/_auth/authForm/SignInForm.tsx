
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
import { signInValidation } from "@/_lib/validations";
import { Loader } from "@/components/custom/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import { useSigninAccount } from "@/_lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

    const { mutateAsync: signInAccount } = useSigninAccount();
    // 1. define your form
    const form = useForm<z.infer<typeof signInValidation>>({
        resolver: zodResolver(signInValidation),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    // 2. Define a submit handler
    async function onSubmit(values: z.infer<typeof signInValidation>) {
        console.log("CHECKING...");
        
        const session = await signInAccount(values)
        console.log(session, values, "CHeckkkkk");
        

        if (!session) {
            toast({
                title: "We couldn’t verify your social login. Please reconnect your account or try again later."
            })
            return;
        }

        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            toast({ title: 'Sign up failed, Please try again. ' })
        }


    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <div className="flex-center w-14 h-14">
                    <img src="Assets/images/fav_icon.png" alt="logo" className="" />
                    <h2 className="h3-bold text-light-3">BlinkUp</h2>
                </div>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-2">Log in to your account</h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">Welcome to BlinkUp, please enter your details</p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
                        {isUserLoading ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                        ) : "Sign in"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don't have an account? <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}

export default SignInForm;