import { MapContainer, Marker, TileLayer, Popup, useMapEvent, useMap } from 'react-leaflet';
import markerIcon from "../assets/marker.png";
import '../css/Map.css'
import L from "leaflet";
import { Report } from '../data/reportType';
import { useState } from 'react';

const icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32]
})

function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
        console.log(e.latlng);
      map.setView(e.latlng, map.getZoom());
    })
  
    return null
}

function MapWindow({reports}:{reports: Report[]}) {

    const [map, setMap] = useState(null);
    const markers = reports.map(report =>
        <Marker 
            position={[report.lat, report.lon]} 
            icon={icon}
            eventHandlers={{
                click: (e) => {
                    map.setView([report.lat, report.lon], map.getZoom());
                }
            }}>
            <Popup>
                <h1>{report.location}</h1>
                <p>Type: {report.type}</p>
            </Popup>
        </Marker>
    );

    return (
        <>
            <MapContainer center={[49.279677,-122.92596]} zoom={13} scrollWheelZoom={true} id={'map'} ref={setMap}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
            <SetViewOnClick/>
            </MapContainer>
        </>
    )
}

export default MapWindow