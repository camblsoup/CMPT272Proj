import './css/App.css'

import Taskbar from './Taskbar'
import Window from './Window'
import mapIcon from './assets/map-icon.png'
import reportIcon from './assets/report.png'
import listIcon from './assets/list.png'
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
    const [isEditingReport, setIsEditingReport] = useState(false);

    const [map, setMap] = useState<L.Map | null>(null);

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

    function zoomToReport(report: Report) {
        // check if report lat and lon are numbers
        if (typeof report.lat === 'number' && typeof report.lon === 'number') {
            map?.setView([report.lat, report.lon], map.getZoom());
        }
    }

    function openWindow(type: windowTypes) {
        const data = getData(type);
        if (type === windowTypes.MAP) {
            const existingMapWindow = windows.find((curData) => curData.type === type);
            if (existingMapWindow) {
                const mapWindowIndex = windows.indexOf(existingMapWindow)
                changeActiveWindow(mapWindowIndex);
                return;
            }
            setWindows((prevWindows) => [
                ...prevWindows, data
            ]);
            setWindows((prevWindows) => [
                ...prevWindows, getData(windowTypes.LIST)
            ]);
            return;
        }
        if (type === windowTypes.LIST) {
            const existingListWindow = windows.find((curData) => curData.type === type);
            if (existingListWindow) {
                const listWindowIndex = windows.indexOf(existingListWindow)
                changeActiveWindow(listWindowIndex);
                return;
            }
        }

        if (type === windowTypes.LOGIN) {
            const existingListWindow = windows.find((curData) => curData.type === type);
            if (existingListWindow) {
                const listWindowIndex = windows.indexOf(existingListWindow)
                changeActiveWindow(listWindowIndex);
                return;
            }
        }

        setWindows((prevWindows) => [
            ...prevWindows, data
        ]);
        changeActiveWindow(windows.length - 1);
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

        if (windowToClose.type === windowTypes.MAP) {
            setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex && prevWindows[index].type !== windowTypes.LIST));
        } else if (windowToClose.type === windowTypes.LIST) {
            setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex && prevWindows[index].type !== windowTypes.MAP));
        } else {
            setWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex));
        }
    }

    function unminimizeWindow(windowIndex: number) {
        setMinimizedWindows(prevWindows => prevWindows.filter((_, index) => index !== windowIndex));
        changeActiveWindow(windowIndex);
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
                data.position = {x: 5, y: 5};
                break;
            case windowTypes.LIST:
                data.size = {width: 600, height: 700};
                data.position = {x: 5, y: 5};
                break;
            case windowTypes.REPORT:
                data.size = {width: 600, height: 700};
                data.position = {x: 5, y: 5};
                if (report) {
                    data.reportIndex = report;
                }
                break;
            case windowTypes.LOGIN:
                data.size = {width: 170, height: 700};
                data.position = {x: 5, y: 5};
                break;
            default:
                break;
        }
        return data
    }

    function renderWindow(data: windowData, index: number) {
        data.index = index;
        return <Window data={data}
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
