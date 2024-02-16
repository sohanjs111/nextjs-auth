"use client";

import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verification } from "@/actions/verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSucces] = useState<string | undefined>();


    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("Missing token!");
            return;
        }

        verification(token)
            .then((data) => {
                setSucces(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Somthing went wrong!")
            })
    }, [token, success, error]);

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
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    
    )
}