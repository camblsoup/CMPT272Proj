import {Report, ReportList} from "./data/reportType";
import ListItem from "./ListItem";

function ListWindow({reports}: ReportList) {
    return (
        <div>
            <h1>Incidents</h1>
            <table>
                <th>
                    Type
                </th>
                <th>
                    Witness
                </th>
                <th>
                    Location
                </th>
                <th>
                    Date
                </th>
                {reports.map((report: Report) => {
                    return (
                        <ListItem report={report} key={report.id} />
                    )
                })}
            </table>
        </div>
    )

}

export default ListWindow;