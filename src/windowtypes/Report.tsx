import { Report } from "../data/reportType.ts";

function ReportWindow({ 
    report, 
    isEditing,
    updateReports,
    changeEditing,
    reports
}: { 
    report: Report, 
    isEditing: boolean,
    updateReports: (reports: Report[]) => void,
    changeEditing: (editing: boolean) => void,
    reports: Report[]
}) {
    function handleSave(e: React.FormEvent) {
        e.preventDefault(); // Prevent form submission
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        
        console.log('Current report:', report);
        
        const updatedReport: Report = {
            ...report,
            type: formData.get('type') as string,
            status: formData.get('status') as string,
            wit_name: formData.get('wit_name') as string,
            wit_phone: formData.get('wit_phone') as string,
            location: formData.get('location') as string,
            comments: formData.get('comments') as string,
            date: formData.get('date') as string,
            picture: formData.get('picture') as string
        };
        console.log('Updated report:', updatedReport);
        
        console.log('Reports:', reports);

        const updatedReports = reports.map(r => 
            r.id === report.id ? updatedReport : r
        );
        updateReports(updatedReports);
        changeEditing(false);
    }

    function handleCancel() {
        changeEditing(false);
    }

    if (!isEditing) {
        return (
            <>
                {report &&
                    <div>
                        <h1>{report.type}</h1>
                        <p>{report.status}</p>
                        <p>{report.wit_name}</p>
                        <p>{report.wit_phone}</p>
                        <p>{report.location}</p>
                        <img src={report.picture} alt="Report Picture" />
                        <p>{report.comments}</p>
                        <p>{report.date}</p>
                    </div>
                }
            </>
        )
    } else {
        return (
            <>
                {report &&
                    <div>
                        <form onSubmit={handleSave}>
                            <div>
                                <label>Report Type:</label>
                                <input type="text" name="type" defaultValue={report.type} />
                            </div>
                            <div>
                                <label>Status:</label>
                                <select name="status" defaultValue={report.status}>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                            <div>
                                <label>Witness Name:</label>
                                <input type="text" name="wit_name" defaultValue={report.wit_name} />
                            </div>
                            <div>
                                <label>Witness Phone:</label>
                                <input type="text" name="wit_phone" defaultValue={report.wit_phone} />
                            </div>
                            <div>
                                <label>Location:</label>
                                <input type="text" name="location" defaultValue={report.location} />
                            </div>
                            <div>
                                <label>Comments:</label>
                                <textarea 
                                    name="comments"
                                    defaultValue={report.comments}
                                    rows={4}
                                />
                            </div>
                            <div>
                                <label>Date:</label>
                                <input type="text" name="date" defaultValue={report.date} />
                            </div>
                            <div>
                                <label>Picture:</label>
                                <input type="text" name="picture" defaultValue={report.picture} />
                            </div>
                            <div>
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                }
            </>
        )
    }
}

export default ReportWindow;