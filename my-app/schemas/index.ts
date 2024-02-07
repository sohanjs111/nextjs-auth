import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Enter a valid Password"
    })
})