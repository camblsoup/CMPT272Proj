import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import mapIcon from './assets/map-icon.png'
import listIcon from './assets/list.png'
import reportIcon from './assets/report.png'
import {windowTypes} from "./data/enums.ts";
import {useEffect, useState} from 'react';
import {Report} from './data/reportType';

import L from "leaflet";
import {windowData} from "./data/windowType.ts";

function App() {
    const [signedInCheck, setSignedIn] = useState(false);

    useEffect(() => {
        console.log("signedIn state changed:", signedInCheck);
    }, [signedInCheck]);

    const [reports, setReports] = useState<Report[]>(() => {
        const savedReports = localStorage.getItem('reports');
        return savedReports ? JSON.parse(savedReports) : [];
    });
    const [activeWindow, setActiveWindow] = useState(0);
    const [minimizedWindows, setMinimizedWindows] = useState<number[]>([]);
    const [currentReport, setCurrentReport] = useState(0);
    const [windows, setWindows] = useState<windowData[]>([]);
    const [isEditingReport, setIsEditingReport] = useState<number>(-1);

    const [map, setMap] = useState<L.Map | null>(null);

    useEffect(() => {
        localStorage.setItem('reports', JSON.stringify(reports));
    }, [reports]);


    function updateReports(newReports: Report[]) {
        setReports(newReports);
    }

    function changeActiveWindow(id: number) {
        setActiveWindow(id);
    }

    function changeCurrentReport(reportId: number) {
        setCurrentReport(reportId);
    }

    function changeEditingReport(editingId: number) {
        setIsEditingReport(editingId);
    }

    function zoomToReport(report: Report) {
        // check if report lat and lon are numbers
        map?.setView([report.lat, report.lon], map.getZoom());
    }

    function openWindow(type: windowTypes) {
        const data = getData(type);
        if (type === windowTypes.LIST) {
            data.id++;
        }
        if (type === windowTypes.MAP) {
            const existingMapWindow = windows.find((curData) => curData.type === type);
            if (existingMapWindow) {
                changeActiveWindow(existingMapWindow.id);
                return;
            }
            setWindows((prevWindows) => [
                ...prevWindows, data
            ]);
            openWindow(windowTypes.LIST);
            changeActiveWindow(data.id);
            return;
        }
        if (type === windowTypes.LIST) {
            const existingListWindow = windows.find((curData) => curData.type === type);
            if (existingListWindow) {
                changeActiveWindow(existingListWindow.id);
                return;
            }
            data.id++;
        }

        if (type === windowTypes.LOGIN) {
            const existingListWindow = windows.find((curData) => curData.type === type);
            if (existingListWindow) {
                changeActiveWindow(existingListWindow.id);
                return;
            }
        }

        setWindows((prevWindows) => [
            ...prevWindows, data
        ]);
        changeActiveWindow(data.id);
    }

    function isMinimized(id: number) {
        return minimizedWindows.includes(id);
    }

    function minimizeWindow(id: number) {
        setMinimizedWindows(prevWindows => [...prevWindows, id]);
        setActiveWindow(-1);
    }

    function unminimizeWindow(windowId: number) {
        setMinimizedWindows(prevWindows => prevWindows.filter((id) => id !== windowId));
        changeActiveWindow(windowId);
    }

    function closeWindow(windowId: number) {
        const windowToClose = windows.find((data) => data.id === windowId);

        if (!windowToClose) {
            return;
        }

        if (windowToClose.type === windowTypes.MAP) {
            setWindows(prevWindows => prevWindows.filter((data) => data.id !== windowId && data.type !== windowTypes.LIST));
        } else if (windowToClose.type === windowTypes.LIST) {
            setWindows(prevWindows => prevWindows.filter((data) => data.id !== windowId && data.type !== windowTypes.MAP));
        } else {
            setWindows(prevWindows => prevWindows.filter((data) => data.id !== windowId));
        }
    }

    function getData(type: windowTypes, report?: number) {
        const data: windowData = {
            id: Date.now(),
            type: type,
            position: {x: 0, y: 0},
            size: {width: 0, height: 0},
            index: -1,
        };
        data.type = type;
        switch (type) {
            case windowTypes.MAP:
                data.size = {width: 800, height: 700};
                data.position = {x: 80, y: 5};
                break;
            case windowTypes.LIST:
                data.size = {width: 600, height: 700};
                data.position = {x: 700, y: 50};
                break;
            case windowTypes.REPORT:
                data.size = {width: 600, height: 700};
                data.position = {x: 5, y: 5};
                if (report) {
                    data.reportIndex = report;
                }
                break;
            case windowTypes.LOGIN:
                data.size = {width: 700, height: 170};
                data.position = {x: 5, y: 5};
                break;
            default:
                break;
        }
        return data
    }

    function renderWindow(data: windowData, index: number) {
        data.index = index;
        return <Window key={data.id}
                       data={data}
                       activeIndex={activeWindow}
                       changeActive={changeActiveWindow}
                       currentReport={currentReport}
                       changeCurrentReport={changeCurrentReport}
                       reports={reports}
                       updateReports={updateReports}
                       closeWindow={closeWindow}
                       isMinimized={isMinimized}
                       minimizeWindow={minimizeWindow}
                       isEditing={isEditingReport}
                       changeEditing={changeEditingReport}
                       openWindow={openWindow}
                       signedInCheck={setSignedIn}
                       windows={windows}
                       map={map}
                       changeMap={setMap}
                       zoomToReport={zoomToReport}
                       signedIn={signedInCheck}/>;
    }

    return (
        <>
            <div id={"windowsBody"}>
                {windows.map((type, index) => (
                    renderWindow(type, index)
                ))}
            </div>
            <div id={"desktop"}>
                <button className={"app"} onDoubleClick={() => openWindow(windowTypes.MAP)}>
                    <img src={mapIcon} alt={"map desktop icon"}/>
                    <p>Map</p>
                </button>
                <button className={"app"} onDoubleClick={() => openWindow(windowTypes.LIST)}>
                    <img src={listIcon} alt={"list desktop icon"}/>
                    <p>List of reports</p>
                </button>
                <button className={"app"} onDoubleClick={() => openWindow(windowTypes.REPORT)}>
                    <img src={reportIcon} alt={"report desktop icon"}/>
                    <p>Report</p>
                </button>
            </div>
            <Taskbar activeIndex={activeWindow} windows={windows} unminimizeWindow={unminimizeWindow}/>
        </>
    )
}

export default App
