import './css/Window.css'
import mapIcon from './assets/map-icon.png'
import listIcon from './assets/list.png'
import reportIcon from './assets/report.png'
import signinIcon from './assets/sign-in.png'
import minimize from './assets/minimize.png'
import maximize from './assets/maximize.png'
import cross from './assets/cross.png'
import MapWindow from './windowtypes/Map.tsx'
import ListWindow from './windowtypes/List.tsx'
import ReportWindow from './windowtypes/Report.tsx'
import {windowTypes} from "./data/enums.ts"
import {Report} from "./data/reportType"
import React, {MouseEvent, useEffect, useState} from 'react'
import SignInTab from './windowtypes/login.tsx'

// Window Element Specification
function Window({
                    initWidth,
                    initHeight,
                    initPos,
                    type,
                    windowIndex,
                    activeIndex,
                    changeActive,
                    currentReport,
                    changeCurrentReport,
                    reports,
                    updateReports,
                    closeWindow,
                    isMinimized,
                    minimizeWindow,
                    isEditing,
                    changeEditing,
                    openWindow,
                    signedInCheck,
                    signedIn,
                    windows,
                    map,
                    changeMap,
                    zoomToReport
                }: {
    initWidth: number,
    initHeight: number,
    initPos: { x: number, y: number },
    type: windowTypes,
    windowIndex: number,
    activeIndex: number,
    changeActive: (index: number) => void,
    currentReport: number,
    changeCurrentReport: (reportId: number) => void,
    reports: Report[],
    updateReports: (reports: Report[]) => void,
    closeWindow: (index: number) => void,
    isMinimized: (index: number) => boolean,
    minimizeWindow: (index: number) => void,
    isEditing: boolean,
    changeEditing: (editing: boolean) => void,
    openWindow: (type: windowTypes) => void
    signedInCheck: React.Dispatch<React.SetStateAction<boolean>>;
    signedIn: boolean,
    windows: windowTypes[],
    map: L.Map | null,
    changeMap: (map: L.Map) => void,
    zoomToReport: (report: Report) => void
}) {

    const [regularPosition, setRegularPosition] = useState(initPos);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({x: 0, y: 0});
    const [regularSize, setRegularSize] = useState({width: initWidth, height: initHeight});
    const [size, setSize] = useState({width: initWidth, height: initHeight});
    const [position, setPosition] = useState(initPos);
    const [maximized, setMaximized] = useState<boolean>(false);

    const style: React.CSSProperties = {
        width: size.width,
        height: size.height,
        position: 'absolute',
        top: position.y,
        left: position.x
    }

    const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        changeActive(windowIndex);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (maximized) {
            unmaximizeWindow();
        }
        if (isDragging) {
            const newX = e.clientX;
            const newY = e.clientY;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight - 51;

            // can change this to allow windows to be dragged slightly off screen
            const boundedX = Math.min(Math.max(newX, 0), viewportWidth);
            const boundedY = Math.min(Math.max(newY, 0), viewportHeight);

            const windowX = boundedX - dragOffset.x;
            const windowY = boundedY - dragOffset.y;

            setPosition({
                x: windowX,
                y: windowY
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove as never);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove as never);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, isDragging]);

    function renderBody() {
        switch (type) {
            case windowTypes.MAP:
                return <MapWindow
                    reports={reports}
                    openWindow={openWindow}
                    changeCurrentReport={changeCurrentReport}
                    changeActiveWindow={changeActive}
                    map={map}
                    changeMap={changeMap}
                />;
            case windowTypes.LOGIN:
                return <SignInTab
                    signedInCheck={signedInCheck}
                    closeWindow={closeWindow}
                    windowIndex={windowIndex}
                    windows={windows}
                />;
            case windowTypes.LIST:
                return <ListWindow
                    reports={reports}
                    changeCurrentReport={changeCurrentReport}
                    updateReports={updateReports}
                    changeEditing={changeEditing}
                    openWindow={openWindow}
                    signedInCheck={signedInCheck}
                    signedIn={signedIn}
                    zoomToReport={zoomToReport}
                />;
            case windowTypes.REPORT:
                return <ReportWindow
                    reports={reports}
                    report={reports.find(r => r.id === currentReport) || reports[0]}
                    isEditing={isEditing}
                    updateReports={updateReports}
                    changeEditing={changeEditing}
                />;
            default:
                return 'error';
        }
    }

    function maximizeWindow() {
        setMaximized(true);
        setRegularSize(size);
        setRegularPosition(position);
        setSize({ width: window.innerWidth - 8, height: window.innerHeight - 48 })
        setPosition({ x: 0, y: 0 });
    }

    function unmaximizeWindow() {
        setSize(regularSize);
        setPosition(regularPosition);
        setMaximized(false);
    }

    return (
        <>
            <div
                className={isMinimized(windowIndex) ? "window-hidden" : activeIndex === windowIndex ? "window-active" : "window"}
                style={style}
                onClick={() => !isDragging && changeActive(windowIndex)}
            >
                <div
                    className="top-bar"
                    onMouseDown={handleMouseDown}
                >
                    <div className={"title"} style={{color: "white"}}>
                        <img
                            src={type === windowTypes.MAP ? mapIcon : type === windowTypes.LIST ? listIcon : type === windowTypes.REPORT ? reportIcon : signinIcon}
                            alt={"map icon"}/>
                        <h1>{type}</h1>
                    </div>
                    <div className={"window-buttons"}>
                        <div className={"window-size-buttons"}>
                            <button className={"window-button"} onClick={() => minimizeWindow(windowIndex)}><img
                                className={"window-button-icon"} src={minimize} alt={"minimize icon"}/></button>
                            <button className={type === windowTypes.LOGIN ? "hidden" : "window-button"}
                                    onClick={maximized ? unmaximizeWindow : maximizeWindow}>
                                <img className={"window-button-icon"} src={maximize} alt={"maximize icon"}/></button>
                        </div>
                        <button className={"window-button"} onClick={() => closeWindow(windowIndex)}><img
                            className={"window-button-icon"} src={cross} alt={"close icon"}/></button>
                    </div>
                </div>
                <div className={"body"}>
                    {renderBody()}
                </div>
                <div className={type === windowTypes.LOGIN ? "hidden" : "info"}>
                    <p>{reports.length} Report(s)</p>
                </div>
            </div>
        </>
    )
}

// Specifies a default function to return when called
export default Window