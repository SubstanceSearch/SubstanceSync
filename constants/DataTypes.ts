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

/// SUBSTANCE SCREEN
// src/constants/DataTypes.ts (Updated types)

// Define common nested structures first

export interface TimingDetailValue {
    value: string;
    unit: string;
}

export interface TimingDetail {
    [roa: string]: TimingDetailValue;
}

export interface Timing {
    onset: TimingDetail;
    duration: TimingDetail;
    aftereffects: TimingDetail;
}

export interface DosageRouteValue {
    units: string;
    threshold: number | null;
    light: { min: number; max: number | null };
    common: { min: number; max: number | null };
    strong: { min: number; max: number | null };
    heavy: number | null;
}

export interface DosageRoutes {
    [roa: string]: DosageRouteValue;
}

export interface Dosage {
    routes: DosageRoutes;
    bioavailability: number | null;
}

export interface Properties {
    summary: string;
    avoid: string;
    test_kits: string;
    half_life: string;
    warnings: string[];
    note: string;
}

export interface Links {
    experiences: string[];
    research: string[];
    wikipedia: string[];
    general: string[];
}

export interface LegalStatus {
    international: string;
}

export interface Metadata {
    last_updated: string;
    source_url: string;
    confidence_score: number | null;
}

// This interface describes the structure of data *inside* "tripsit" or "psychonautwiki"
export interface SubstanceDataContent {
    name: string;
    pretty_name: string;
    aliases: string[];
    categories: string[];
    properties: Properties;
    timing: Timing;
    dosage: Dosage;
    effects: string[]; // Simple array of effect names
    effects_detailed: { name: string; url: string; category: string }[]; // Detailed effects
    interactions: {
        dangerous: string[];
        unsafe: string[];
        caution: string[];
    };
    links: Links;
    legal_status: LegalStatus;
    metadata: Metadata;
}

// This interface describes a single raw substance entry from data.json,
// which can contain "tripsit" and/or "psychonautwiki" data.
export interface RawSubstanceDataItem {
    tripsit?: SubstanceDataContent;
    psychonautwiki?: SubstanceDataContent;
}

// This interface describes the entire raw data.json file structure
export interface RawSubstanceData {
    [substanceName: string]: RawSubstanceDataItem;
}

// This interface describes the final MERGED data object for a substance,
// which will be used in the FlatList and passed to detail screens.
export interface MergedSubstanceData extends SubstanceDataContent {
    // Additionally, include the raw data sources for deep inspection if needed
    tripsitData?: SubstanceDataContent;
    psychonautwikiData?: SubstanceDataContent;
}