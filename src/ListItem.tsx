import { Report } from "./data/reportType";

function ListItem({ report, selectedItem, setSelectedItem }: { report: Report, selectedItem: number, setSelectedItem: (id: number) => void }) {
    return (
        <tr key={report.id} onClick={() => setSelectedItem(report.id)} className={selectedItem === report.id ? 'selected' : ''}>
            {selectedItem === report.id ? <td>-</td> : <td></td>}
            <td>{report.type}</td>
            <td>{report.wit_name}</td>
            <td>{report.location}</td>
            <td>{report.date}</td>
        </tr>
    )
}

export default ListItem;