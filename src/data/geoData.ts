export interface GeocoderProps {
    onCoordsRetrieved: (coordinates: Location[]) => void;
}

export interface Location {
    display_name: string;
    lat: number;
    lon: number;
}

