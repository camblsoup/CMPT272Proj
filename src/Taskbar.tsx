import './css/Footer.css'
import wondows from './assets/wondows.png'
import mapIcon from './assets/map-icon.png'
import {useEffect, useState} from 'react'
import {windowTypes} from "./data/enums.ts";
import listIcon from "./assets/list.png";
import reportIcon from "./assets/report.png";

function Taskbar({ activeIndex, windows, unminimizeWindow }: { activeIndex: number, windows: windowTypes[], unminimizeWindow: (index: number ) => void }) {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <footer id={"taskbar"}>
            <div className={"taskbar-apps"}>
                <a className={"normal-tab"} href="">
                    <img src={wondows} alt={"🏠"}></img>
                    <h1>Home</h1>
                </a>
                <div className={"embossed-bar"}></div>
                <div className={"extruding-bar"}></div>
                <div className={"active-apps"}>
                    {windows.map((type, index) => (
                        <button key={index} className={ activeIndex === index ? "focused-window" : "unfocused-window" } onClick={() => unminimizeWindow(index)}>
                            <img src={type === windowTypes.MAP ? mapIcon : type === windowTypes.LIST ? listIcon : reportIcon} alt={"app icon"}/>
                            <h1>{type} {windows.filter((type) => type === windowTypes.LIST).length > 1 ? (index + 1) : ""}</h1>
                        </button>
                    ))}
                </div>
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