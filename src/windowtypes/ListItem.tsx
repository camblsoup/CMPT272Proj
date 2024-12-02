import { Report } from "../data/reportType.ts";

function ListItem({ report, selectedItem, setSelectedItem }: { report: Report, selectedItem: number, setSelectedItem: (id: number) => void }) {
    return (
        <tr key={report.id} onClick={() => setSelectedItem(report.id)} className={selectedItem === report.id ? 'selected' : ''}>
            <td>{selectedItem === report.id ? " - " + report.type : report.type}</td>
            <td>{report.status}</td>
            <td>{report.location}</td>
            <td>{report.date}</td>
            <td>{report.time}</td>
        </tr>
    )
}

export default ListItem;