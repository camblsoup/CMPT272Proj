import React, {ChangeEvent, useState} from "react";
import {Report} from "../data/reportType.ts";
import {GeocoderProps, Location} from "../data/geoData.ts";
import "../css/Report.css";

function focusButton(flag: number) {
    if (flag) {
        document.getElementsByClassName("search")[0].id = "focused";
    } else {
        document.getElementsByClassName("search")[0].id = "";
    }
}

const Geocoder: React.FC<GeocoderProps> = ({onCoordsRetrieved}) => {
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const handleSearch = async () => {
        focusButton(1);
        if (!address) {
            setError("Please enter an address.");
            return;
        }
        setError("");

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=3&countrycodes=CA`
        );
        if (!response.ok) {
            setError("An error occurred while fetching data. Please try again.");
            return
        }
        const data: Location[] = await response.json();
        if (data.length === 0) {
            onCoordsRetrieved(data);
            setError("No results found");
            return;
        }
        if (onCoordsRetrieved) {
            onCoordsRetrieved(data);
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
            {error && <p style={{color: "red"}}>{error}</p>}
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
    isEditing: number,
    updateReports: (reports: Report[]) => void,
    changeEditing: (editing: number) => void,
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

        if (locations[0]) {
            updatedReport.address = locations[0].display_name;
        }

        if (isNaN(updatedReport.lat) || isNaN(updatedReport.lon)) {
            setErr("Please enter a latitude and longitude.");
            return;
        }
        console.log('Updated report:', updatedReport);

        console.log('Reports:', reports);

        const updatedReports = reports.map(r =>
            r.id === report.id ? updatedReport : r
        );
        updateReports(updatedReports);
        changeEditing(-1);
    }

    function handleCancel() {
        changeEditing(-1);
    }

    const [lat, setLat] = useState<number>(report.lat);
    const [lon, setLon] = useState<number>(report.lon);
    const [err, setErr] = useState<string | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const handleCoordsRetrieved = (coords: Location[]) => {
        console.log(coords);
        setLocations(coords);
        setLat(coords[0].lat);
        setLon(coords[0].lon)
    };

    function handleLonChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value != null) {
            setLon(parseInt(event.target.value));
        } else {
            setLon(0);
        }
    }

    function handleLatChange(event: ChangeEvent<HTMLInputElement>) {

        if (event.target.value != null) {
            setLat(parseInt(event.target.value));
        } else {
            setLat(0);
        }
    }

    if (isEditing != report.id) {
        return (
            <>
                {report &&
                    <div className={"report"}>
                        <img className={report.picture ? "report-image" : ""} src={report.picture}
                             alt={report.picture ? "Report Picture" : "No Image"}/>
                        <h1><u>R</u>eport <u>T</u>ype: {report.type}</h1>
                        <p><u>S</u>tatus: {report.status}</p>
                        <p><u>{report.wit_name ? "W" : ""}</u>{report.wit_name ? "itness: " : ""}{report.wit_name}</p>
                        <p>
                            <u>{report.wit_phone ? "W" : ""}</u>{report.wit_phone ? "itness Contact: " : ""}{report.wit_phone}
                        </p>
                        <p><u>{report.location ? "L" : ""}</u>{report.location ? "ocation: " : ""}{report.location}</p>
                        <p><u>{report.address ? "A" : ""}</u>{report.address ? "ddress: " : ""}{report.address}</p>
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
                            <div onClick={() => focusButton(0)}>
                                <label>Report Type:</label>
                                <input type="text" name="type" defaultValue={report.type}/>
                            </div>
                            <div onClick={() => focusButton(0)}>
                                <label>Status:</label>
                                <select name="status" defaultValue={report.status}>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                            <div onClick={() => focusButton(0)}>
                                <label>Witness Name:</label>
                                <input type="text" name="wit_name" defaultValue={report.wit_name}/>
                            </div>
                            <div onClick={() => focusButton(0)}>
                                <label>Witness Phone:</label>
                                <input type="text" name="wit_phone" defaultValue={report.wit_phone}/>
                            </div>
                            <div>
                                <label>Location:</label>
                                <input type="text" name="location" defaultValue={report.location}
                                       placeholder="Descriptive Name"/>
                                <br/>
                                <Geocoder onCoordsRetrieved={handleCoordsRetrieved}/>
                                <p>{locations.length > 0 ? "Address: " : ""}{locations.length > 0 ? locations[0].display_name : ""}</p>
                                <label>Latitude:</label>
                                <input type="number" min={-90} max={90} name="lat"
                                       onChange={(event) => handleLatChange(event)}
                                       value={lat}/>
                                <label> Longitude:</label>
                                <input type="number" min={-180} max={180} name="lon"
                                       onChange={(event) => handleLonChange(event)}
                                       value={lon}/>
                                <br/>
                            </div>
                            <div onClick={() => focusButton(0)}>
                                <label>Comments:</label>
                                <textarea
                                    name="comments"
                                    defaultValue={report.comments}
                                    rows={1}
                                    cols={18}
                                    style={{verticalAlign: "top", maxWidth: "490px"}}
                                />
                            </div>
                            <div onClick={() => focusButton(0)}>
                                <label>Date:</label>
                                <input type="text" name="date" defaultValue={report.date}/>
                            </div>
                            <div onClick={() => focusButton(0)}>
                                <label>Picture:</label>
                                <input type="url" name="picture" defaultValue={report.picture}
                                       placeholder={"Enter a URL"}/>
                            </div>
                            <div>
                                {err && <p style={{color: "red"}}>{err}</p>}
                            </div>
                            <div onClick={() => focusButton(0)}>
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