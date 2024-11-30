import { Report } from "./data/reportType";

function ListItem({ report }: { report: Report }) {
    return (
        <tr key={report.id}>
            <td>{report.type}</td>
            <td>{report.wit_name}</td>
            <td>{report.location}</td>
            <td>{report.date}</td>
        </tr>
    )
}

export default ListItem;