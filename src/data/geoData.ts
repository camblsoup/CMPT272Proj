export interface GeocoderProps {
    onCoordsRetrieved: (coordinates: Coordinates) => void;
}

export interface Coordinates {
    lat: number;
    lon: number;
}