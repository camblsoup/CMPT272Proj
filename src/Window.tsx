import './css/Window.css'
import icon from './assets/map-icon.png'
import minimize from './assets/minimize.png'
import maximize from './assets/maximize.png'
import cross from './assets/cross.png'
import MapWindow from './Map'
import ListWindow from './List.tsx'
import ReportWindow from './Report.tsx'
import { windowTypes } from "./data/enums.ts"
import { Report } from "./data/reportType"
import { useState, MouseEvent, useEffect } from 'react'

// Window Element Specification
function Window({ width, height, type, windowIndex, activeIndex, changeActive, currentReport, changeCurrentReport, reports, updateReports }: { width: number, height: number, type: windowTypes, windowIndex: number, activeIndex: number, changeActive: (index: number) => void, currentReport: number, changeCurrentReport: (reportId: number) => void, reports: Report[], updateReports: (reports: Report[]) => void }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const style = {
        width: width,
        height: height,
        transform: `translate(${position.x}px, ${position.y}px)`,
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
        if (isDragging) {
            const newX = e.clientX;
            const newY = e.clientY;
            
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight - 61;
            
            // can change this to allow windows to be dragged slightly off screen
            const boundedX = Math.min(Math.max(newX, 0), viewportWidth);
            const boundedY = Math.min(Math.max(newY, 12), viewportHeight);

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
            document.addEventListener('mousemove', handleMouseMove as any);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove as any);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    function renderBody() {
        switch (type) {
            case windowTypes.MAP:
                return <MapWindow />;
            case windowTypes.LIST:
                return <ListWindow
                    reports={reports}
                    changeCurrentReport={changeCurrentReport}
                    updateReports={updateReports}
                />;
            case windowTypes.REPORT:
                return <ReportWindow
                    report={reports.find(r => r.id === currentReport) || reports[0]}
                />;
            default:
                return 'error';
        }
    }

    return (
        <>
            <div 
                className={windowIndex === activeIndex ? "window-active" : "window"} 
                style={style} 
                onClick={() => !isDragging && changeActive(windowIndex)}
            >
                <div 
                    className="top-bar"
                    onMouseDown={handleMouseDown}
                >
                    <div className={"title"}>
                        <img src={icon} alt={"map icon"} />
                        <h1>Map</h1>
                    </div>
                    <div className={"window-buttons"}>
                        <div className={"window-size-buttons"}>
                            <button className={"window-button"}><img className={"window-button-icon"} src={minimize} alt={"minimize icon"} /></button>
                            <button className={"window-button"}><img className={"window-button-icon"} src={maximize} alt={"maximize icon"} /></button>
                        </div>
                        <button className={"window-button"}><img className={"window-button-icon"} src={cross} alt={"close icon"} /></button>
                    </div>
                </div>
                <div className={"body"}>
                    {renderBody()}
                </div>
                <div className={"info"}>
                    <h1>{reports.length} Report(s)</h1>
                </div>
            </div>
        </>
    )
}

// Specifies a default function to return when called
export default Window