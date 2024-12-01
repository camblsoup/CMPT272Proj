import { useState } from "react";
import hash from "./APIs/md5hash";

export const useSignIn = () => {
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    
    const setPassword = (input: string) => {
        return setPasscode(input);
    }

    const errorHandle = (input: string) => {
        return setError(input);
    }

    const handleSignIn = async () => {
        try {
            const hashedResult: any = await hash(passcode);
            const hashedPassword = hashedResult.Digest;
            // password is "user123"
            const storedHash = "6ad14ba9986e3615423dfca256d04e3f";

            if (hashedPassword === storedHash) {
                alert("Authentication successful!");
                errorHandle("");
                
                // continue writing authentication process
                // implement authorized editing of reports
            }
            else {
                errorHandle("Incorrect password or username. Please try again");
            }
        } catch (error) {
            errorHandle("Please try again");
        }
    }

    return {
        passcode,
        setPassword,
        error,
        handleSignIn
    }
}



    
