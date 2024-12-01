import { Report } from "../data/reportType.ts";

function ReportWindow({ report, isEditing }: { report: Report, isEditing: boolean }) {

    if (!isEditing) {
        return (
            <>
                {report &&
                    <div>
                        <h1>{report.type}</h1>
                        <p>{report.wit_name}</p>
                        <p>{report.location}</p>
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
                        <h1>EDITING: {report.type}</h1>
                        <p>{report.wit_name}</p>
                        <p>{report.location}</p>
                        <p>{report.date}</p>
                        <p>{report.comments}</p>
                    </div>
                }
            </>
        )


    }
}

export default ReportWindow;