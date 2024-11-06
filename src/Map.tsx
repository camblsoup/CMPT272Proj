import { MapContainer, TileLayer, useMap } from 'react-leaflet'


function MapWindow() {
    return (
        <>
            <div id="map"></div>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </MapContainer>
        </>
    )
}


export default MapWindow