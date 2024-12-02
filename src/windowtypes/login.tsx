import { useSignIn } from "../SignIn.ts";
import '../css/Login.css'

function SignInTab({ signedInCheck, closeWindow, windowIndex }: { signedInCheck: React.Dispatch<React.SetStateAction<boolean>>, bypass: boolean, closeWindow: (index: number) => void, windowIndex: number}) {
    const {passcode, setPassword, error, handleSignIn} = useSignIn();

    const handleLogin = async ()=> {
        const success = await handleSignIn();
        if (success) {
            signedInCheck(true);
        }
        else {
            signedInCheck(false);
        }
    }

    return (
        <div id={"signin"} style={{textAlign: "center"}}>
            <div id={"signin-form"}>
                <p>Type a password to edit a report.</p>
                <label style={{marginRight: 20}}><u>P</u>assword:</label>
                <input type="password"
                       value={passcode}
                       onChange={(e) => {
                           setPassword(e.target.value)
                       }}
                />
                <p style={{color: "red", height: 21, marginTop: 15}}>{error}</p>
            </div>
            <div id={"signin-buttons"}>
            <button onClick={handleLogin}>Submit</button>
                <button onClick={() => closeWindow(windowIndex)}>Cancel</button>
            </div>
        </div>
    )
}

export default SignInTab;