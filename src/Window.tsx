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

// Window Element Specification
function Window({ width, height, type, windowIndex, activeIndex, changeActive, currentReport, changeCurrentReport, reports, updateReports }: { width: number, height: number, type: windowTypes, windowIndex: number, activeIndex: number, changeActive: (index: number) => void, currentReport: number, changeCurrentReport: (reportId: number) => void, reports: Report[], updateReports: (reports: Report[]) => void }) {
    const style = {
        width: width,
        height: height
    }

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
            <div className={"window"} style={style} onClick={() => changeActive(windowIndex)}>
                {windowIndex === activeIndex ? <h1>ACTIVE</h1> : <h1>INACTIVE</h1>}
                <div className={"top-bar"}>
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