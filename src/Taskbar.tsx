import './css/Footer.css'
import wondows from './assets/wondows.png'
import {useEffect, useState} from 'react'

function Taskbar() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    function openMap() {

    }

    return (
        <footer>
            <div className={"taskbar-apps"}>
                <a className={"normal-tab"} href="">
                    <img src={wondows} alt={"🏠"}></img>
                    <h1>Home</h1>
                </a>
                <div className={"embossed-bar"}></div>
                <div className={"extruding-bar"}></div>
                <button className={"normal-tab"} onClick={openMap}>
                    <img src={wondows} alt={"🏠"}></img>
                    <h1>Map</h1>
                </button>
                <button className={"normal-tab"} onClick={openMap}>
                    <img src={wondows} alt={"🏠"}></img>
                    <h1>List</h1>
                </button>
                <button className={"normal-tab"} onClick={openMap}>
                    <img src={wondows} alt={"🏠"}></img>
                    <h1>Report</h1>
                </button>
            </div>
            <div className={"taskbar-info"}>
                <div className={"embossed-bar"}></div>
                <div className="taskbar-time">
                    <p>{time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                </div>
            </div>
        </footer>
    )
}

export default Taskbar