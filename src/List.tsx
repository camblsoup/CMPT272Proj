import { Report } from "./data/reportType";
import ListItem from "./ListItem";
import { useState } from "react";

function ListWindow({ 
    reports, 
    changeCurrentReport, 
    updateReports 
}: { 
    reports: Report[], 
    changeCurrentReport: (reportId: number) => void,
    updateReports: (reports: Report[]) => void 
}) {
    const [selected, setSelected] = useState(0);

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
            status: "open"
        };
        updateReports([...reports, newReport]);
    }

    function deleteReport() {
        if (selected >= 0) {
            const updatedReports = reports.filter(report => report.id !== selected);
            updateReports(updatedReports);
            setSelected(0);
        }
    }

    return (
        <>
            <div className="list-window-buttons">
                <button onClick={addNewReport}>New</button>
                <button onClick={() => {changeCurrentReport(selected)}}>Open</button>
                <button>Edit</button>
                <button onClick={deleteReport}>Delete</button>
            </div>
            <div>
                <h1>Incidents</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
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