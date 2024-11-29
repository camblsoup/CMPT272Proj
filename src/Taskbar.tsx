import './css/Footer.css'
import wondows from './assets/wondows.png'

function Taskbar() {
    return (
        <footer>
            <a className={"normal-tab"} href="">
                <img src={wondows} alt={"🏠"}></img>
                <h1>Home</h1>
            </a>
        </footer>
    )
}

// Specifies a default function to return when called
export default Taskbar