import {Report} from "../data/reportType.ts";
import ListItem from "./ListItem.tsx";
import {useState} from "react";
import {windowTypes} from "../data/enums.ts";
import {useSignIn} from "../signIn.ts";

function ListWindow({ 
    reports, 
    changeCurrentReport, 
    updateReports,
    changeEditing,
    openWindow
}: { 
    reports: Report[], 
    changeCurrentReport: (reportId: number) => void,
    updateReports: (reports: Report[]) => void,
    changeEditing: (editing: boolean) => void
    openWindow: (type: windowTypes) => void
}) {
    const [selected, setSelected] = useState(0);
    const { checkAuthentication } = useSignIn();

    function changeSelected(reportId: number) {
        setSelected(reportId);
    }

    function addNewReport() {
        const maxId = Math.max(...reports.map(r => r.id), -1);
        const newReport: Report = {
            id: maxId + 1,
            type: "New Incident - " + (maxId + 1),
            wit_name: "",
            wit_phone: "",
            location: "",
            picture: "",
            comments: "",
            date: new Date().toLocaleDateString(),
            status: "Open"
        };
        updateReports([...reports, newReport]);

        return maxId + 1;
    }

    function handleEdit(reportID: number) {
        if (checkAuthentication()) {
            changeCurrentReport(reportID);
            changeEditing(true);
        } else {
            openWindow(windowTypes.LOGIN);
        }
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
        const report = addNewReport();
        changeCurrentReport(report);
        changeEditing(true);
    }

    return (
        <>
            <div className="list-window-buttons">
                <button onClick={handleAdd}>New</button>
                <button onClick={() => {handleOpen(selected)}}>Open</button>
                <button onClick={() => {handleEdit(selected)}}>Edit</button>
                <button onClick={deleteReport}>Delete</button>
            </div>
            <div>
                <h1>Incidents</h1>
                <table style={{"width": "100%"}}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Witness</th>
                            <th>Location</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report: Report) => (
                            <ListItem 
                                report={report} 
                                key={report.id} 
                                selectedItem={selected} 
                                setSelectedItem={changeSelected} 
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListWindow;