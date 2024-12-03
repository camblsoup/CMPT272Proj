import { useSignIn } from "../SignIn.ts";
import '../css/Login.css'
import {windowData} from "../data/windowType.ts";

function SignInTab({ signedInCheck, closeWindow, windowIndex, windows }: { signedInCheck: React.Dispatch<React.SetStateAction<boolean>>, closeWindow: (index: number) => void, windowIndex: number, windows: windowData[]}) {
    const {passcode, setPassword, error, handleSignIn} = useSignIn();

    const handleLogin = async ()=> {
        const success = await handleSignIn();
        if (success) {
            signedInCheck(true);
            closeWindow(windows.length - 1);
        }
        else {
            signedInCheck(false);
        }
        // @ts-ignore
        let button = document.getElementById("signin-buttons").children.item(0);
        // @ts-ignore
        button.id = "click";
    }

    return (
        <div id={"signin"} style={{textAlign: "center"}} onClick={() => {
            // @ts-ignore
            let button = document.getElementById("signin-buttons").children.item(0);
            // @ts-ignore
            button.id = "";
        }}>
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
                <button onClick={handleLogin}>Ok</button>
                <button onClick={() => closeWindow(windowIndex)}>Cancel</button>
            </div>
        </div>
    )
}

export default SignInTab;