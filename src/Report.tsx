import { Report } from "./data/reportType";

function ReportWindow({ report }: { report: Report }) {
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

}

export default ReportWindow;