import { MapContainer, Marker, TileLayer} from 'react-leaflet';
import markerIcon from "./assets/marker.png";
import L from "leaflet";

const icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [16, 16]
})

function MapWindow() {
    
    return (
        <>
            <MapContainer center={[49.279677,-122.92596]} zoom={13} scrollWheelZoom={true} id={'map'}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[49.279677,-122.92596]} icon={icon}></Marker>
            </MapContainer>
        </>
    )
}

export default MapWindow