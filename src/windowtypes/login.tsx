import {useSignIn} from "../SignIn.ts";
import '../css/Login.css'
import {windowData} from "../data/windowType.ts";
import {windowTypes} from "../data/enums.ts";

function SignInTab({ signedInCheck, closeWindow, window, windows }: { signedInCheck: React.Dispatch<React.SetStateAction<boolean>>, closeWindow: (id: number) => void, window: windowData, windows: windowData[]}) {
    const {passcode, setPassword, error, handleSignIn} = useSignIn();

    const handleLogin = async ()=> {
        const success = await handleSignIn();
        if (success) {
            signedInCheck(true);
            const window = windows.find((data) => data.type === windowTypes.LOGIN);
            if (window) {
                closeWindow(window.id);
            }
        }
        else {
            signedInCheck(false);
        }
        // @ts-ignore
        const button = document.getElementById("signin-buttons").children.item(0);

        if (button) {
            button.id = "click";
        }
    }

    return (
        <div id={"signin"} style={{textAlign: "center"}} onClick={() => {
            // @ts-ignore
            const button = document.getElementById("signin-buttons").children.item(0);
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
                <button onClick={() => closeWindow(window.id)}>Cancel</button>
            </div>
        </div>
    )
}

export default SignInTab;