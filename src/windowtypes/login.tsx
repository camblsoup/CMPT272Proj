import { useSignIn } from "../signIn";

function SignInTab() {
    const {passcode, setPassword, error, handleSignIn} = useSignIn();

    return (
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

export default SignInTab;