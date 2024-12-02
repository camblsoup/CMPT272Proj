interface Report {
    id: number;
    type: string;
    wit_name: string;
    wit_phone: string;
    location: string;
    lat: number;
    lon: number;
    picture: string;
    comments: string;
    date: string;
    time: string;
    status: string;
}

interface ReportList {
    reports: Report[];
}

export type { Report, ReportList };
