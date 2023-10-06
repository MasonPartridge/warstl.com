export interface Unit {
    name: string;
    id: number;
}

export interface UnitCategory {
    name: string;
    id: number;
    units: Unit[];
}