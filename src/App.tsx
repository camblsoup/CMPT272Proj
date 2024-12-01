import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import mapIcon from './assets/map-icon.png'
import reportIcon from './assets/report.png'
import listIcon from './assets/list.png'
import {windowTypes} from "./data/enums.ts";
import {useEffect, useState} from 'react';
import {Report} from './data/reportType';

function App() {
    const [reports, setReports] = useState<Report[]>(() => {
        const savedReports = localStorage.getItem('reports');
        return savedReports ? JSON.parse(savedReports) : [];
    });
    const [activeWindow, setActiveWindow] = useState(0);
    const [minimizedWindows, setMinimizedWindows] = useState<number[]>([]);
    const [currentReport, setCurrentReport] = useState(0);
    const [windows, setWindows] = useState<windowTypes[]>([]);
    const [isEditingReport, setIsEditingReport] = useState(false);

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

    function changeEditingReport(editing: boolean) {
        setIsEditingReport(editing);
    }

    function openWindow(type: windowTypes) {
        if (type === windowTypes.MAP) {
            const existingMapWindow = windows.find((currType) => currType === type);
            if (existingMapWindow) {
                const mapWindowIndex = windows.indexOf(existingMapWindow)
                changeActiveWindow(mapWindowIndex);
                return;
            }
            setWindows((prevWindows) => [
                ...prevWindows, type
            ]);
            setWindows((prevWindows) => [
                ...prevWindows, windowTypes.LIST
            ]);
            return;
        }
        if (type === windowTypes.LIST) {
            const existingListWindow = windows.find((currType) => currType === type);
            if (existingListWindow) {
                const listWindowIndex = windows.indexOf(existingListWindow)
                changeActiveWindow(listWindowIndex);
                return;
            }
        }


        setWindows((prevWindows) => [
            ...prevWindows, type
        ]);
    }

    function isMinimized(index: number) {
        return minimizedWindows.includes(index);
    }

    function minimizeWindow(index: number) {
        setMinimizedWindows(prevWindows => [...prevWindows, index]);
        setActiveWindow(-2);
    }

    function closeWindow(windowIndex: number) {
        const windowToClose = windows[windowIndex];

        if (windowToClose === windowTypes.MAP) {
            setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex && prevWindows[index] !== windowTypes.LIST));
        } else if (windowToClose === windowTypes.LIST) {
            setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex && prevWindows[index] !== windowTypes.MAP));
        } else {
            setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex));
        }

        if (windowIndex === activeWindow) {
            setActiveWindow(-1);
        }
    }

    function unminimizeWindow(windowIndex: number) {
        setMinimizedWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex));
        changeActiveWindow(windowIndex);
    }

    return (
        <>
            <div id={"windowsBody"}>
                {windows.map((type, index) => (
                    type === windowTypes.MAP ?
                        <Window key={index}
                                initWidth={800}
                                initHeight={700}
                                initPos={{x: 100, y: 5}}
                                type={type}
                                windowIndex={index}
                                activeIndex={activeWindow} changeActive={changeActiveWindow}
                                currentReport={currentReport} changeCurrentReport={changeCurrentReport}
                                reports={reports}
                                updateReports={updateReports}
                                closeWindow={closeWindow}
                                isMinimized={isMinimized}
                                minimizeWindow={minimizeWindow}
                                isEditing={isEditingReport}
                                changeEditing={changeEditingReport}
                        /> : type === windowTypes.LIST ?
                            <Window key={index}
                                    initWidth={600}
                                    initHeight={700}
                                    initPos={{x: 700, y: 100}}
                                    type={type}
                                    windowIndex={index}
                                    activeIndex={activeWindow} changeActive={changeActiveWindow}
                                    currentReport={currentReport} changeCurrentReport={changeCurrentReport}
                                    reports={reports}
                                    updateReports={updateReports}
                                    closeWindow={closeWindow}
                                    isMinimized={isMinimized}
                                    minimizeWindow={minimizeWindow}
                                    isEditing={isEditingReport}
                                    changeEditing={changeEditingReport}
                            /> :
                            <Window key={index}
                                    initWidth={800}
                                    initHeight={700}
                                    initPos={{x: 25, y: 25}}
                                    type={type}
                                    windowIndex={index}
                                    activeIndex={activeWindow} changeActive={changeActiveWindow}
                                    currentReport={currentReport} changeCurrentReport={changeCurrentReport}
                                    reports={reports}
                                    updateReports={updateReports}
                                    closeWindow={closeWindow}
                                    isMinimized={isMinimized}
                                    minimizeWindow={minimizeWindow}
                                    isEditing={isEditingReport}
                                    changeEditing={changeEditingReport}
                            />


                    ))}
            </div>
            <div id={"desktop"}>
                <button className={"app"} onDoubleClick={() => openWindow(windowTypes.MAP)}>
                    <img src={mapIcon} alt={"map desktop icon"}/>
                    <p>Map</p>
                </button>
                <button className={"app"} onDoubleClick={() => openWindow(windowTypes.LIST)}>
                    <img src={listIcon} alt={"list desktop icon"}/>
                    <p>Reports</p>
                </button>
                <button className={"app"} onDoubleClick={() => openWindow(windowTypes.REPORT)}>
                    <img src={reportIcon} alt={"report desktop icon"}/>
                    <p>Details</p>
                </button>
            </div>
            <Taskbar activeIndex={activeWindow} windows={windows} unminimizeWindow={unminimizeWindow}/>
        </>
    )
}

export default App
