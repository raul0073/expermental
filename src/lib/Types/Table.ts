export interface ITable {
    team: string;
    MP: number;
    W: number;
    D: number;
    L: number;
    Pts: number;
    GF: string;
    GA: string;
    GD: number;
}

export type TableAPIType = {
    date: string;
    table: ITable[]
}
export interface IFullTable extends ITable {
    avAge: number;
    possession: number;
    assists: number;// expected goals and assists  - pk goals
    prgP: number; 
    xG: number; // expected goals per 90minutes
    xAG: number; // expected assists per 90minutes
}