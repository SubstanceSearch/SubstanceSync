export interface Experience {
    location: Location | null;
    timedNotes: any[];
    sortDate: number;
    isFavorite: boolean;
    ingestions: Ingestion[];
    text: string;
    creationDate: number;
    ratings: any[];
    title: string;
    fullJSON: string;
}
export interface Location {
    name?: string;
    latitude?: number;
    longitude?: number;
}

export interface Ingestion {
    dose: number;
    substanceName: string;
    units: string;
    administrationRoute: string;
    time: number;
    notes: string;
    creationDate: number;
    consumerName: string | null;
    endTime: number | null;
    isDoseAnEstimate: boolean;
    estimatedDoseStandardDeviation: number | null;
    customUnitId: number | null;
    stomachFullness: string | null;
}

