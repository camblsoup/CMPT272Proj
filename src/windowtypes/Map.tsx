import { MapContainer, Marker, TileLayer, Popup, useMapEvent, useMap } from 'react-leaflet';
import markerIcon from "../assets/marker.png";
import '../css/Map.css'
import L from "leaflet";
import { Report } from '../data/reportType';
import { windowTypes } from '../data/enums';
import { ReactOsmGeocoding } from '@paraboly/react-osm-geocoding'
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

function MapWindow({reports, openWindow, changeCurrentReport, changeActiveWindow, map, changeMap}:{reports: Report[], openWindow: (type: windowTypes) => void, changeCurrentReport: (reportId: number) => void, changeActiveWindow: (index: number) => void, map: L.Map | null, changeMap: (map: L.Map) => void}) {

    const isMarkerInBounds = (report: Report): boolean => {
        if (!map || typeof report.lat !== 'number' || typeof report.lon !== 'number') {
            return false;
        }
        const bounds = map.getBounds();
        return bounds.contains([report.lat, report.lon]);
    };

    const visibleReports = reports.filter(report => isMarkerInBounds(report));
    
    const markers = visibleReports.filter(report => 
        typeof report.lat === 'number' && 
        typeof report.lon === 'number'
    ).map(report =>
        <Marker 
            key={report.id}
            position={[report.lat, report.lon]}
            icon={icon}
            eventHandlers={{
                click: () => {
                    map?.setView([report.lat, report.lon], map.getZoom());
                    openWindow(windowTypes.REPORT);
                    changeCurrentReport(report.id);
                    changeActiveWindow(0);
                }
            }}
        >
            <Popup>
                <h1>{report.location}</h1>
                <p>Type: {report.type}</p>
            </Popup>
        </Marker>
    );

    return (
        <>
            <MapContainer center={[49.279677,-122.92596]} zoom={13} scrollWheelZoom={true} id={'map'} ref={changeMap}>
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