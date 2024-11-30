import './css/Footer.css'
import wondows from './assets/wondows.png'
import { useState, useEffect } from 'react'

function Taskbar() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <footer>
            <a className={"normal-tab"} href="">
                <img src={wondows} alt={"🏠"}></img>
                <h1>Home</h1>
            </a>
            <a className={"normal-tab"} href="">
                <img src={wondows} alt={"🏠"}></img>
                <h1>Map</h1>
            </a>
            <a className={"normal-tab"} href="">
                <img src={wondows} alt={"🏠"}></img>
                <h1>List</h1>
            </a>
            <a className={"normal-tab"} href="">
                <img src={wondows} alt={"🏠"}></img>
                <h1>Report</h1>
            </a>
            <div className="taskbar-time">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </footer>
    )
}

export default Taskbar