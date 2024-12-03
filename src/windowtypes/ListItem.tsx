import { Report } from "../data/reportType.ts";

function ListItem({ report, selectedItem, setSelectedItem }: { report: Report, selectedItem: number, setSelectedItem: (id: number) => void }) {
    return (
        <tr key={report.id} onClick={() => setSelectedItem(report.id)} className={selectedItem === report.id ? 'selected' : ''}>
            <td style={{width: "180px", maxWidth: "180px"}}><p className={(selectedItem === report.id ? "highlighted" : "") + " report-name"}>{report.type}</p></td>
            <td style={{width: "80px", maxWidth: "80px"}}>{report.status}</td>
            <td style={{width: "150px", maxWidth: "150px"}}>{report.location}</td>
            <td style={{width: "90px", maxWidth: "90px"}}>{report.date}</td>
            <td>{report.time}</td>
        </tr>
    )
}

export default ListItem;