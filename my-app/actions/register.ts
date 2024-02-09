"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    // confirm the fields are not invalid
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    // extract the validation fields
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // check for the existing user in the database
    const existingUser = await getUserByEmail(email);
    // If there is an existing user with this email, send back an error message
    if (existingUser) {
        return { error: "This account already exists!" };
    }

    await  db.user.create({ 
        data: { 
            name, 
            email, 
            password: hashedPassword,  
        }, 
    });

    const verificationToken = await generateVerificationToken(email);
    // TODO: Send verification taken email

    return { success: "User Created!" };
};