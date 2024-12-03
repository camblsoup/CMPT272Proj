import { useState } from "react";
import { Report } from "../data/reportType.ts";
import { GeocoderProps, Location } from "../data/geoData.ts";
import "../css/Report.css";

function focusButton(flag: number){
    if(flag){
        document.getElementsByClassName("search")[0].id = "focused";
    }
    else{
        document.getElementsByClassName("search")[0].id = "";
    }
}

const Geocoder: React.FC<GeocoderProps> = ({ onCoordsRetrieved }) => {
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const handleSearch = async () => {
        focusButton(1);
        if (!address) {
            setError("Please enter an address.");
            return;
        }
        setError("");
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=3&countrycodes=CA`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data: Location[] = await response.json();
            if (data.length === 0) {
                setError("No results found");
                return;
            }
            if (onCoordsRetrieved) {
                onCoordsRetrieved(data);
            }
        } catch (err) {
            setError("An error occurred while fetching data. Please try again.");
        }
    };
  
    return (
        <>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter an address..."
            />
            <button type="button" className="search" onClick={handleSearch}>Search</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

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
            lat: parseFloat(formData.get('lat') as string),
            lon: parseFloat(formData.get('lon') as string),
            comments: formData.get('comments') as string,
            date: formData.get('date') as string,
            picture: formData.get('picture') as string
        };
        if(isNaN(updatedReport.lat) || isNaN(updatedReport.lon)) {
            setErr("Please enter a location.");
            return;
        }
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

    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[] | null>(null);
    const handleCoordsRetrieved = (coords: Location[]) => {
        console.log(coords);
        setLocations(coords);
    };

    if (!isEditing) {
        return (
            <>
                {report &&
                    <div className={"report"}>
                        <img className={report.picture ? "report-image" : ""} src={report.picture} alt={report.picture ? "Report Picture" : "No image"}/>
                        <h1><u>R</u>eport <u>T</u>ype: {report.type}</h1>
                        <p><u>S</u>tatus: {report.status}</p>
                        <p><u>{report.wit_name ? "W" : ""}</u>{report.wit_name ? "itness: " : ""}{report.wit_name}</p>
                        <p><u>{report.wit_phone ? "W" : ""}</u>{report.wit_phone ? "itness Contact: " : ""}{report.wit_phone}</p>
                        <p><u>{report.location ? "L" : ""}</u>{report.location ? "ocation: " : ""}{report.location}</p>
                        <p><u>{report.lat ? "L" : ""}</u>{report.lat ? "atitude: " : ""}{report.lat}</p>
                        <p><u>{report.lon ? "L" : ""}</u>{report.lon ? "ongitude: " : ""}{report.lon}</p>
                        <p><u>{report.comments ? "C" : ""}</u>{report.comments ? "omments: " : ""}{report.comments}</p>
                        <p><u>D</u>ate: {report.date}</p>
                    </div>
                }
            </>
        )
    } else {
        return (
            <>
                {report &&
                    <div className="report-edit">
                        <form onSubmit={handleSave}>
                            <div onClick={()=>focusButton(0)}>
                                <label>Report Type:</label>
                                <input type="text" name="type" defaultValue={report.type} />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Status:</label>
                                <select name="status" defaultValue={report.status}>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Witness Name:</label>
                                <input type="text" name="wit_name" defaultValue={report.wit_name} />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Witness Phone:</label>
                                <input type="text" name="wit_phone" defaultValue={report.wit_phone} />
                            </div>
                            <div>
                                <label>Location:</label>
                                <input type="text" name="location" defaultValue={report.location} placeholder="Descriptive Name"/>
                                <br />
                                <input type="text" name="lat" defaultValue={report.lat} value={lat || report.lat}/>
                                <input type="text" name="lon" defaultValue={report.lon} value={lon || report.lon}/>
                                <br />
                                <Geocoder onCoordsRetrieved={handleCoordsRetrieved} />
                                {locations && (
                                    <div>
                                        <table>
                                            <tr>
                                                <th>Name</th>
                                                <th>Latitiude</th>
                                                <th>Longitude</th>
                                            </tr>
                                            {locations.map((location, index) => (
                                                <tr>
                                                    <td style={{width: "350px", maxWidth: "350px"}}>{location.display_name}</td>
                                                    <td style={{width: "100px", maxWidth: "100px"}}>{location.lat}</td>
                                                    <td>{location.lon}</td>
                                                </tr>
                                            ))}
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Comments:</label>
                                <textarea 
                                    name="comments"
                                    defaultValue={report.comments}
                                    rows={1}
                                    cols={18}
                                    style={{verticalAlign: "top", maxWidth: "490px"}}
                                />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Date:</label>
                                <input type="text" name="date" defaultValue={report.date} />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Picture:</label>
                                <input type="url" name="picture" defaultValue={report.picture} placeholder={"Enter a URL"}/>
                            </div>
                            <div>
                                {err && <p style={{color: "red"}}>{err}</p>}
                            </div>
                            <div onClick={()=>focusButton(0)}>
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