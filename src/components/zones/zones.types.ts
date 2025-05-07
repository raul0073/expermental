// src/config/pitchZones.ts

export type ChannelZone = {
  id: string;
  label: string;
  position: [number, number]; // [x, z]
  length: number;             // X-axis (goal-to-goal)
  width: number;              // Z-axis (touchline-to-touchline)
};

const PITCH_LENGTH = 105;  // meters (X)
const PITCH_WIDTH  =  68;  // meters (Z)

// Percentages for each channel from left to right (Z-axis)
const ZONE_PERCENTAGES = [0.15, 0.15, 0.40, 0.15, 0.15]; // wide, half, center, half, wide

const labels = [
  { id: "leftWide",     label: "Left Wing" },
  { id: "leftHalf",     label: "Left Channel" },
  { id: "central",      label: "Central Area" },
  { id: "rightHalf",    label: "Right Channel" },
  { id: "rightWide",    label: "Right Wing" },
];

// Helper to compute center Z position of each zone
function computeZones(): ChannelZone[] {
  const zones: ChannelZone[] = [];
  let zStart = -PITCH_WIDTH / 2;

  for (let i = 0; i < ZONE_PERCENTAGES.length; i++) {
    const width = ZONE_PERCENTAGES[i] * PITCH_WIDTH;
    const centerZ = zStart + width / 2;

    zones.push({
      id: labels[i].id,
      label: labels[i].label,
      position: [0, centerZ], // X is center (0), Z is center of this zone
      length: PITCH_LENGTH,
      width,
    });

    zStart += width;
  }

  return zones;
}

export const verticalChannelZones: ChannelZone[] = computeZones();
