import { useState } from "react";
import { Report } from "../data/reportType.ts";
import { GeocoderProps, Coordinates } from "../data/geoData.ts";
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
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=1&countrycodes=CA`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            if (data.length === 0) {
                setError("No results found");
                return;
            }
            const { lat, lon } = data[0];
            if (onCoordsRetrieved) {
                onCoordsRetrieved({lat, lon});
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
    const handleCoordsRetrieved = (coords: Coordinates) => {
        console.log(coords);
        setLat(coords.lat);
        setLon(coords.lon);
    };

    if (!isEditing) {
        return (
            <>
                {report &&
                    <div className={"report"}>
                        <img className={report.picture ? "report-image" : ""} src={report.picture} alt={report.picture ? "Report Picture" : "No image"}/>
                        <h1>{report.type}</h1>
                        <p>{report.status}</p>
                        <p>{report.wit_name}</p>
                        <p>{report.wit_phone}</p>
                        <p>{report.location}</p>
                        <p>{report.lat}</p>
                        <p>{report.lon}</p>
                        <p>{report.comments}</p>
                        <p>{report.date}</p>
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
                                <input type="text" name="lat" defaultValue={report.lat} value={lat || ""}/>
                                <input type="text" name="lon" defaultValue={report.lon} value={lon || ""}/>
                                <br />
                                <Geocoder onCoordsRetrieved={handleCoordsRetrieved} />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Comments:</label>
                                <textarea 
                                    name="comments"
                                    defaultValue={report.comments}
                                    rows={4}
                                />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Date:</label>
                                <input type="text" name="date" defaultValue={report.date} />
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <label>Picture:</label>
                                <input type="text" name="picture" defaultValue={report.picture} />
                            </div>
                            <div>
                                {err && <p style={{color: "red"}}>{err}</p>}
                            </div>
                            <div onClick={()=>focusButton(0)}>
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                        <div className="after" onClick={()=>focusButton(0)}></div>
                    </div>
                }
            </>
        )
    }
}

export default ReportWindow;