"use client";

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const VerificationForm = () => {
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        console.log(token);
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return(
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to Login"
            backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
                <BeatLoader />
            </div>
        </CardWrapper>
    
    )
}