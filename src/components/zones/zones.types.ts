
export type ChannelZone = {
  id: string;
  label: string;
  position: [number, number]; // [x, z] center of the zone
  length: number;             // size in X (goal-to-goal)
  width: number;              // size in Z (touchline-to-touchline)
};
type ZoneBreakdown = {
  team: TeamZoneBreakdown
  against: TeamZoneBreakdown
  players: PlayersZoneBreakdown
}
type TeamZoneBreakdown = {
  score: number;
  raw: number;
  pros: string[]
  cons: string[]
  weight: number;
}
type PlayersZoneBreakdown = {
  score: number;
  contributions: PlayersContribution[]
  raw: number;
  weight: number;
  
}
type PlayersContribution = {
  name: string, rating:number, minutes:number, position_weight: number
}
export type FullSelectableZone = ChannelZone & {
  rating: number;
  //eslint-disable-next-line
  players: any[];
  //eslint-disable-next-line
  team: Record<string, any>;
};
export type FullZone = ChannelZone & {
  rating: number;
  breakdown: ZoneBreakdown
  raw?: {team: number, against: number, players: number}
};
const PITCH_LENGTH = 105;
const PITCH_WIDTH = 68;

const ZONE_PERCENTAGES = [0.15, 0.15, 0.40, 0.15, 0.15]; // Z-axis (width)
const X_THIRD_LENGTH = PITCH_LENGTH / 3; // 35m per third

export const Zoneslabels = [
  { id: "defLeftWide", label: "Defensive Left Wing" },
  { id: "defLeftHalf", label: "Defensive Left Channel" },
  { id: "defCentral", label: "Defensive Central Area" },
  { id: "defRightHalf", label: "Defensive Right Channel" },
  { id: "defRightWide", label: "Defensive Right Wing" },

  { id: "midLeftWide", label: "Middle Third Left Wing" },
  { id: "midLeftHalf", label: "Middle Third Left Channel" },
  { id: "midCentral", label: "Middle Third Central Area" },
  { id: "midRightHalf", label: "Middle Third Right Channel" },
  { id: "midRightWide", label: "Middle Third Right Wing" },

  { id: "attLeftWide", label: "Attacking Left Wing" },
  { id: "attLeftHalf", label: "Attacking Left Channel" },
  { id: "attCentral", label: "Attacking Central Area" },
  { id: "attRightHalf", label: "Attacking Right Channel" },
  { id: "attRightWide", label: "Attacking Right Wing" },
];

function computeZones(): ChannelZone[] {
  const zones: ChannelZone[] = [];
  let labelIndex = 0;

  // Split pitch into 3 horizontal thirds (defensive to attacking)
  for (let third = 0; third < 3; third++) {
    const xStart = -PITCH_LENGTH / 2 + third * X_THIRD_LENGTH;
    const xCenter = xStart + X_THIRD_LENGTH / 2;

    // Within each third, split into 5 vertical zones
    let zStart = -PITCH_WIDTH / 2;
    for (let z = 0; z < ZONE_PERCENTAGES.length; z++) {
      const width = ZONE_PERCENTAGES[z] * PITCH_WIDTH;
      const zCenter = zStart + width / 2;

      const label = Zoneslabels[labelIndex];

      zones.push({
        id: label.id,
        label: label.label,
        position: [xCenter, zCenter],
        length: X_THIRD_LENGTH,
        width,
      });

      zStart += width;
      labelIndex++;
    }
  }

  return zones;
}

export const verticalChannelZones: ChannelZone[] = computeZones();
