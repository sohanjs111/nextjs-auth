"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper"

export const LoginForm = () =>  {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <CardWrapper 
            headerLabel="Welcome Back"
            backButtonLabel="Dont have an account?"
            backButtonHref="/register"
            showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(() => {})}
                    className="space-y-6"
                >

                </form>
            </Form>
        </CardWrapper>
    )
}