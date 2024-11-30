import {Report, ReportList} from "./data/reportType";
import ListItem from "./ListItem";

function ListWindow({reports}: ReportList) {
    return (
        <div>
            <h1>Incidents</h1>
            <ul>
                {reports.map((report: Report) => {
                    return (
                        <ListItem report={report} key={report.id} />
                    )
                })}
            </ul>
        </div>
    )

}

export default ListWindow;