import { Report } from "./data/reportType";

function ListItem({ report }: { report: Report }) {
    return (
        <li key={report.id}>
            <h2>{report.type}</h2>
            <p>{report.wit_name}</p>
            <p>{report.location}</p>
            <p>{report.date}</p>
        </li>
    )
}

export default ListItem;