"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { ResetSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper"
import { reset } from "@/actions/reset";


export const ResetForm = () =>  {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        // clear all error and success on each submit
        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success);
                })
        });
    };

    return (
        <CardWrapper 
            headerLabel="Forgot your password?"
            backButtonLabel="Back to Login?"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit) }
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}