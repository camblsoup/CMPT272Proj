import { Report } from "../data/reportType.ts";
import ListItem from "./ListItem.tsx";
import { useEffect, useState } from "react";
import { windowTypes } from "../data/enums.ts";
import "../css/List.css";

function ListWindow({
    reports,
    changeCurrentReport,
    updateReports,
    changeEditing,
    openWindow,
    signedInCheck,
    signedIn,
    zoomToReport,
    map
}: {
    reports: Report[],
    changeCurrentReport: (reportId: number) => void,
    updateReports: (reports: Report[]) => void,
    changeEditing: (editing: boolean) => void,
    openWindow: (type: windowTypes) => void,
    zoomToReport: (report: Report) => void,
    signedInCheck: React.Dispatch<React.SetStateAction<boolean>>;
    signedIn: boolean,
    map: L.Map | null
}) {
    useEffect(() => {
        console.log("signedInCheck updated:", signedInCheck);
    }, [signedInCheck]);

    const [selected, setSelected] = useState(0);

    function changeSelected(reportId: number) {
        setSelected(reportId);
        zoomToReport(reports.find(report => report.id === reportId) as Report);
    }

    const [sortMethod, setSortMethod] = useState('id');
    const [showOnlyVisible, setShowOnlyVisible] = useState(false);

    const sortReports = (reports: Report[]): Report[] => {
        return [...reports].sort((a, b) => {
            switch (sortMethod) {
                case 'id':
                    return a.id - b.id;
                case 'type':
                    return a.type.localeCompare(b.type);
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'date':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                case 'location':
                    return a.location.localeCompare(b.location);
                default:
                    return a.id - b.id;
            }
        });
    };

    const isMarkerInBounds = (report: Report): boolean => {
        if (!map || typeof report.lat !== 'number' || typeof report.lon !== 'number') {
            return false;
        }
        const bounds = map.getBounds();
        return bounds.contains([report.lat, report.lon]);
    };

    const filteredReports = showOnlyVisible 
        ? reports.filter(report => isMarkerInBounds(report))
        : reports;

    function addNewReport() {
        const maxId = Math.max(...reports.map(r => r.id), -1);
        const newReport: Report = {
            id: maxId + 1,
            type: "New Incident - " + (maxId + 1),
            wit_name: "",
            wit_phone: "",
            location: "",
            lat: 0,
            lon: 0,
            picture: "",
            comments: "",
            date: new Date().toLocaleDateString(),
            time: new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }).format(new Date()),
            status: "Open"
        };
        updateReports([...reports, newReport]);

        return maxId + 1;
    }

    function handleEdit(reportID: number) {
        openWindow(windowTypes.REPORT);
        changeCurrentReport(reportID);
        changeEditing(true);
    }

    function handleOpen(reportID: number) {
        openWindow(windowTypes.REPORT);
        changeCurrentReport(reportID);
        changeEditing(false);
    }

    function deleteReport() {
        if (selected >= 0) {
            const updatedReports = reports.filter(report => report.id !== selected);
            updateReports(updatedReports);
            setSelected(0);
        }
    }

    function handleAdd() {
        openWindow(windowTypes.REPORT);
        const report = addNewReport();
        changeCurrentReport(report);
        changeEditing(true);
    }

    function updateLastClicked(idx: number){
        // @ts-ignore
        let buttons = document.getElementById("buttons").children;
        for(let i = 0; i < buttons.length; i++){
            if(i === idx){
                // @ts-ignore
                buttons.item(i).id = "lastClicked";
                continue;
            }
            // @ts-ignore
            buttons.item(i).id = "";
        }

    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
                <div id="buttons" className="list-window-buttons">
                    <button onClick={() => {
                        handleAdd()
                        updateLastClicked(0)
                    }}>New
                    </button>
                    <button onClick={() => {
                        handleOpen(selected)
                        updateLastClicked(1)
                    }}>Open
                    </button>
                    <button onClick={() => {
                        if (signedIn) {
                            handleEdit(selected);
                        } else {
                            openWindow(windowTypes.LOGIN);
                        }
                        updateLastClicked(2)
                    }}>Edit
                    </button>
                    <button onClick={() => {
                        if (signedIn) {
                            deleteReport();
                        } else {
                            openWindow(windowTypes.LOGIN);
                        }
                        updateLastClicked(3)
                    }}>Delete
                    </button>
                    <button onClick={() => {
                        setShowOnlyVisible(!showOnlyVisible);
                        updateLastClicked(4)
                    }}>
                        {showOnlyVisible ? 'Show All' : 'Show Visible Only'}
                    </button>
                </div>
                <div className="list-window-sort" onClick={() => updateLastClicked(-1)}>
                    <label htmlFor="sort-select">Sort by: </label>
                    <select
                        id="sort-select"
                        value={sortMethod}
                        onChange={(e) => setSortMethod(e.target.value)}
                    >
                        <option value="id">ID</option>
                        <option value="type">Type</option>
                        <option value="status">Status</option>
                        <option value="date">Date</option>
                        <option value="location">Location</option>
                    </select>
                </div>
                <div className={"table-container"} onClick={() => updateLastClicked(-1)}>
                    <table style={{"width": "100%"}}>
                        <thead>
                        <tr>
                            <th style={{width: "170px"}}>Type</th>
                            <th style={{width: "70px"}}>Status</th>
                            <th style={{width: "140px"}}>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{padding: "0"}} colSpan={5}>
                                <div>
                                    <table>
                                        {sortReports(filteredReports).map((report: Report) => (
                                            <ListItem
                                                report={report}
                                                key={report.id}
                                                selectedItem={selected}
                                                setSelectedItem={changeSelected}
                                            />
                                        ))}
                                    </table>
                                </div>
                            </td>
                        </tr>


                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default ListWindow;