import { useState } from "react";
import hash from "./APIs/md5hash";

interface HashResponse {
    Digest: string
    DigestEnc: string
    Type: string
    Key: string
}

export const useSignIn = () => {
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    
    const setPassword = (input: string) => {
        return setPasscode(input);
    }

    const errorHandle = (input: string) => {
        return setError(input);
    }

    const checkAuthentication = ()=> {
        return authenticated;
    }

    const handleSignIn = async () => {
        try {
            const hashedResult: HashResponse = await hash(passcode);
            const hashedPassword = hashedResult.Digest;

            // password is "user123"
            const storedHash = "6ad14ba9986e3615423dfca256d04e3f";

            if (hashedPassword === storedHash) {
                setAuthenticated(true);
                errorHandle("");
                console.log("authenticated");
                
                // continue writing authentication process
                // implement authorized editing of reports
            }
            else {
                errorHandle("Incorrect password or username. Please try again");
            }
        } catch (error) {
            errorHandle("An error has occured: " + error);
        }
    }

    return {
        passcode,
        setPassword,
        error,
        handleSignIn,
        checkAuthentication
    }
}


    
