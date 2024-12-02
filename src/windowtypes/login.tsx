import { useSignIn } from "../SignIn.ts";
import '../css/Login.css'
import { windowTypes } from "../data/enums.ts";

function SignInTab({ signedInCheck, bypass, closeWindow, windows }: { signedInCheck: React.Dispatch<React.SetStateAction<boolean>>, bypass: boolean, closeWindow: (index: number) => void, windows: windowTypes[] }) {
    const {passcode, setPassword, error, handleSignIn} = useSignIn();

    const handleLogin = async ()=> {
        const success = await handleSignIn();
        if (success) {
            signedInCheck(true);
            bypass = true;
            closeWindow(windows.length - 1);
        }
        else {
            signedInCheck(false);
            bypass = false;
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