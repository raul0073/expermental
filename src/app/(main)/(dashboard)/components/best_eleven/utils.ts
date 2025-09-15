// utils/formationMapping.ts

export type PlayerRole =
  | "GK"
  | "CB"
  | "LCB"
  | "RCB"
  | "FB"
  | "LB"
  | "RB"
  | "RWB"
  | "LWB"
  | "DM"
  | "CDM"
  | "LDM"
  | "RDM"
  | "CM"
  | "LCM"
  | "RCM"
  | "AM"
  | "CAM"
  | "W"
  | "LW"
  | "RW"
  | "LM"
  | "RM"
  | "ST"
  | "CF";

export type FormationType = "433" | "4231" | "532";

export interface PlayerWithPosition {
  name: string;
  number: number;
  role: PlayerRole;
  x?: number; // 0-100%
  y?: number; // 0-100%
  color?: string;
  numberColor?: string;
  onClick?: () => void;
}

const formationCoordinates: Record<
  FormationType,
  Partial<Record<PlayerRole, { x: number; y: number }>>
> = {
  "433": {
    GK: { x: 50, y: 95 },
    LB: { x: 20, y: 75 },
    LCB: { x: 35, y: 75 },
    RCB: { x: 65, y: 75 },
    RB: { x: 80, y: 75 },
    LCM: { x: 35, y: 50 },
    CM: { x: 50, y: 50 },
    RCM: { x: 65, y: 50 },
    LW: { x: 20, y: 20 },
    RW: { x: 80, y: 20 },
    CF: { x: 50, y: 15 },
  },
  "4231": {
    GK: { x: 50, y: 95 },
    LB: { x: 20, y: 75 },
    LCB: { x: 35, y: 75 },
    RCB: { x: 65, y: 75 },
    RB: { x: 80, y: 75 },
    LDM: { x: 35, y: 60 },
    RDM: { x: 65, y: 60 },
    CAM: { x: 50, y: 40 },
    LW: { x: 20, y: 20 },
    RW: { x: 80, y: 20 },
    ST: { x: 50, y: 15 },
  },
  "532": {
    GK: { x: 50, y: 95 },
    LCB: { x: 30, y: 75 },
    CB: { x: 50, y: 75 },
    RCB: { x: 70, y: 75 },
    LWB: { x: 15, y: 55 },
    RWB: { x: 85, y: 55 },
    LCM: { x: 35, y: 45 },
    CM: { x: 50, y: 45 },
    RCM: { x: 65, y: 45 },
    ST: { x: 40, y: 20 },
    CF: { x: 60, y: 20 },
  },
};

export function mapFormationPlayers(
  formation: FormationType,
  players: PlayerWithPosition[]
): PlayerWithPosition[] {
  const coords = formationCoordinates[formation];

  // group players by role to handle duplicates properly
  const roleCount: Record<string, number> = {};

  return players.map((p) => {
    const baseRole = p.role;
    roleCount[baseRole] = (roleCount[baseRole] || 0) + 1;

    // pick sub-role if available
    let roleKey: PlayerRole = baseRole;
    if (!coords[roleKey]) {
      const match = Object.keys(coords).find((k) =>
        k.startsWith(baseRole)
      ) as PlayerRole | undefined;
      if (match) roleKey = match;
    }

    const pos = coords[roleKey] || { x: 50, y: 50 };
    return { ...p, x: pos.x, y: pos.y };
  });
}
export interface PlayerPosition {
  x: number;
  y: number;
}
export const FORMATION_POSITIONS: Record<FormationType, PlayerPosition[]> = {
  "433": [
    { x: 50, y: 90 }, { x: 65, y: 78 }, { x: 35, y: 78 }, { x: 15, y: 70 }, { x: 85, y: 70 },
    { x: 30, y: 41 }, { x: 70, y: 41 }, { x: 50, y: 60 }, { x: 20, y: 25 }, { x: 80, y: 25 }, { x: 50, y: 12 },
  ],
  "4231": [
    { x: 50, y: 90 }, { x: 65, y: 80 }, { x: 35, y: 80 }, { x: 15, y: 70 }, { x: 85, y: 70 },
    { x: 30, y: 50 }, { x: 70, y: 50 }, { x: 50, y: 35 }, { x: 20, y: 25 }, { x: 80, y: 25 }, { x: 50, y: 12 },
  ],
  "532": [
    { x: 50, y: 90 }, { x: 25, y: 80 }, { x: 50, y: 80 }, { x: 75, y: 80 }, { x: 10, y: 60 },
    { x: 90, y: 60 }, { x: 35, y: 43 }, { x: 65, y: 43 }, { x: 50, y: 30 }, { x: 35, y: 12 }, { x: 65, y: 17 },
  ],
};
