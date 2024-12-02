import { useSignIn } from "../SignIn.ts";

function SignInTab({ signedInCheck, bypass }: { signedInCheck: React.Dispatch<React.SetStateAction<boolean>>, bypass: boolean}) {
    const {passcode, setPassword, error, handleSignIn} = useSignIn();

    const handleLogin = async ()=> {
        const success = await handleSignIn();
        if (success) {
            signedInCheck(true);
            bypass = true;
        }
        else {
            signedInCheck(false);
            bypass = true;
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin Sign-In</h1>
            <input type="password"
                placeholder="Please enter admin password"
                value={passcode}
                onChange={(e) => {setPassword(e.target.value)}}
            />
            <button onClick={handleLogin}>Submit</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default SignInTab;