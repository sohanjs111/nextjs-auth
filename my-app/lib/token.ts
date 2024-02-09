import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    // expire the token in 30 minuties
    const expires = new Date(new Date().getTime() + 1800000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return verificationToken;
}