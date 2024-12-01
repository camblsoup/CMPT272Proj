import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import {windowTypes} from "./data/enums.ts";
import {useState, useEffect} from 'react';
import {Report} from './data/reportType';

function App() {
    const [reports, setReports] = useState<Report[]>(() => {
        const savedReports = localStorage.getItem('reports');
        return savedReports ? JSON.parse(savedReports) : [];
    });
    const [activeWindow, setActiveWindow] = useState(0);
    const [currentReport, setCurrentReport] = useState(0);
    const [windows, setWindows] = useState<windowTypes[]>([]);

    useEffect(() => {
        localStorage.setItem('reports', JSON.stringify(reports));
    }, [reports]);

    function updateReports(newReports: Report[]) {
        setReports(newReports);
    }

    function changeActiveWindow(index: number) {
        setActiveWindow(index);
    }

    function changeCurrentReport(reportId: number) {
        setCurrentReport(reportId);
    }

    function openWindow(type: windowTypes) {
        setWindows((prevWindows) => [
            ...prevWindows, type
        ]);
    }

    function closeWindow(windowIndex: number) {
        setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex))
    }

    return (
        <>
            <div id={"windowsBody"}>
                {windows.map((type, index) => (
                    <Window 
                    key={index}
                    width={800}
                    height={700} 
                    type={type} 
                    windowIndex={index}
                    activeIndex={activeWindow} 
                    changeActive={changeActiveWindow}
                    currentReport={currentReport} 
                    changeCurrentReport={changeCurrentReport}
                    reports={reports}
                    updateReports={updateReports}
                    closeWindow={closeWindow}
                    />
                ))}
            </div>
            <Taskbar openWindow={openWindow}/>
        </>
    )
}

export default App
