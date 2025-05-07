export type Player = {
    id: string;
    name: string;
    number: number;
    role: PlayerRole;
    position: [number, number];
    avRating: number;
};

type PlayerRole =
    | "GK"
    | "RB" | "RCB" | "LCB" | "LB"
    | "CDM"
    | "RCM" | "LCM"
    | "RW" | "CF" | "LW";
export const arsenal433HoldingCoordinates: Record<PlayerRole, [number, number]> = {
    GK: [-45, 0],

    LB: [-20, -20],
    LCB: [-32, -10],
    RCB: [-32, 6],
    RB: [-28, 22],

    CDM: [-15, 1],
    LCM: [-5, -12],
    RCM: [5, 18],

    LW: [10, -30],
    CF: [13, 0],
    RW: [18, 30],
};