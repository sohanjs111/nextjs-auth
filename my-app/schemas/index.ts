import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 character required"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2, {
        message: "Enter a valid Password"
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required!",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long!",
    }),
    name: z.string().min(1, {
        message: "Name is required!",
    }),
});