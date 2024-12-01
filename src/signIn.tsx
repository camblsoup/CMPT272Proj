import React, { useState } from "react";
import hash from "./APIs/md5hash";

const signIn: React.FC = () => {
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
            const hashedPassword = await hash(passcode);
            const storedHash = "atFLqZhuNhVCPfyiVtBOPw==";

            if (hashedPassword === storedHash) {
                alert("Authentication successful!");
                window.close();
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

    return(
        <div style={{textAlign: "center"}}>
            <h1>Admin Sign-In</h1>
            <input type="text"
                placeholder="Please enter admin password"
                value={passcode}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Submit</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )

}

export default signIn;

//function signIn({input}){
    
//}