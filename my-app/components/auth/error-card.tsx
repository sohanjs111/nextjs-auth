import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


 export const ErrorCard = ()  => {

    return(
        <CardWrapper
            headerLabel="Opps! Something went wrong!"
            backButtonHref="/login"
            backButtonLabel="Back to Login"
        >
            <div className="flex w-full justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
        
    );
 };