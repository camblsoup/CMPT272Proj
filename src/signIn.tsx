import { useState } from "react";
import hash from "./APIs/md5hash";
//import deleteReport from "./windowtypes/List"

export const useSignIn = () => {
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");

    const setPassword = (input: string) => {
        return setPasscode(input);
    }

    const errorHandle = (input: string) => {
        return setError(input);
    }

    const handleSignIn = async (): Promise<boolean> => {
        try {
            const hashedResult: any = await hash(passcode);
            const hashedPassword = hashedResult.Digest;
            // password is "user123"
            const storedHash = "6ad14ba9986e3615423dfca256d04e3f";

            if (hashedPassword === storedHash) {
                alert("Authentication successful!");
                errorHandle("");
                return true;
            } else {
                errorHandle("Incorrect password or username. Please try again");
                return false;
            }
        } catch (error) {
            errorHandle("Please try again");
            return false;            
        }
    }

    return {
        passcode,
        setPassword,
        error,
        handleSignIn
    }
}



    
