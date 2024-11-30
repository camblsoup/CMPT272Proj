import './css/Window.css'
import icon from './assets/map-icon.png'
import minimize from './assets/minimize.png'
import maximize from './assets/maximize.png'
import cross from './assets/cross.png'
import MapWindow from './Map'
import ListWindow from './List.tsx'
import ReportWindow from './Report.tsx'
import {windowTypes} from "./data/enums.ts";
import {Report, ReportList} from "./data/reportType";


let testReports: ReportList = {
    reports: [
    {
        id: 1,
        type: "Medical",
        wit_name: "John Doe",
        wit_phone: "123-456-7890",
        location: "1234 Elm St",
        picture: "pic",
        comments: "comment",
        date: "01/01/2021",
        status: "open"
    },
    {
        id: 2,
        type: "Cat stuck in tree",
        wit_name: "Jane Doe",
        wit_phone: "123-456-7890",
        location: "1234 Awesome St",
        picture: "pic",
        comments: "comment",
        date: "01/01/2021",
        status: "open"
    }
]}

// Window Element Specification
function Window({width, height, type}: {width: number, height: number, type: windowTypes}) {
    const style = {
        width: width,
        height: height
    }

    const reportCount: number = 0;

    function renderBody() {
        switch (type) {
            case windowTypes.MAP:
                return <MapWindow />;
            case windowTypes.LIST:
                return <ListWindow reports={testReports.reports}/>;
            case windowTypes.REPORT:
                return <ReportWindow report={testReports.reports[0]}/>;
            default:
                return 'error';
        }
    }

    // Html to return
    return (
        <>
            <div className={"window"} style={style}>
                <div className={"top-bar"}>
                    <div className={"title"}>
                        <img src={icon} alt={"map icon"}/>
                        <h1>Map</h1>
                    </div>
                    <div className={"window-buttons"}>
                        <div className={"window-size-buttons"}>
                            <button className={"window-button"}><img className={"window-button-icon"} src={minimize} alt={"minimize icon"}/></button>
                            <button className={"window-button"}><img className={"window-button-icon"} src={maximize} alt={"maximize icon"}/></button>
                        </div>
                        <button className={"window-button"}><img className={"window-button-icon"} src={cross} alt={"close icon"}/></button>
                    </div>
                </div>
                <div className={"body"}>
                    {renderBody()}
                </div>
                <div className={"info"}>
                    <h1>{reportCount} Report(s)</h1>
                </div>
            </div>
        </>
    )
}

// Specifies a default function to return when called
export default Window