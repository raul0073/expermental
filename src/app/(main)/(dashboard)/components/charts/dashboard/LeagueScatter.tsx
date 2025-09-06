"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis,
} from "recharts";
import { StatsPayload } from "../../../utils/types";
import { buildRadarData, getMentalRadarDataForTeams } from "../utils/buildTeamRadar";

type Props = {
  teams: StatsPayload;
};

function TeamsRadarScatter({ teams }: Props) {
  // flatten raw teams stats
  const flatTeamsData = buildRadarData(teams);

  // organize to mental radar categories
  const organizedData = getMentalRadarDataForTeams(flatTeamsData);
   const scatterData = Object.entries(organizedData).map(([teamName, stats]) => ({
  x: stats.chance_creation,      // X-axis = quality of chances
  y: stats.chance_conversion,    // Y-axis = finishing
  z: stats.pressure,             // bubble size = intensity / work rate
  color: stats.ball_recovery,           // bubble color = aerial dominance
  team: teamName,
  league: stats.league,          // if you stored league in organizedData
  passing_quality: stats.passing_quality,
  ball_recovery: stats.ball_recovery,
}));

  const getColor = (value: number) => {
    const hue = Math.min(Math.max((value / 100) * 120, 0), 120); // clamp 0-120
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card className="h-fit  gap-2">
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Team Chances Quality</CardTitle>
        <CardDescription>
          Chances quality: creation vs. conversion, sized by pressure and colored by aerial ability
        </CardDescription>
      </CardHeader>
          <CardContent className="w-full h-[80vh] md:h-[700px] relative">
     {/* Quadrant labels */}
<div className="absolute top-2 right-2 font-bold text-gray-600 z-10">
  Strong & balanced
</div>
<div className="absolute top-2 left-2 font-bold text-gray-600 z-10">
  Clinical but limited
</div>
<div className="absolute bottom-2 right-2 font-bold text-gray-600 z-10">
  Creative but wasteful
</div>
<div className="absolute bottom-2 left-2 font-bold text-gray-600 z-10">
  Weak & inconsistent
</div>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              dataKey="x"
              name="Chance Creation"
              label={{ value: "Chance Creation", position: "bottom", offset: 5 }}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Chance Conversion"
              label={{ value: "Chance Conversion", angle: -90, position: "insideLeft" }}
              domain={[0, 1]}
            />
            <ZAxis type="number" dataKey="z" range={[20, 150]} name="Pressure" />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-background p-2 rounded shadow-md border text-zinc-500">
                      <div>
                        <strong>{p.team}</strong> ({LEAGUES_NAME[p.league]})
                      </div>
                      <div>Passing Quality: {p.passing_quality.toFixed(1)}</div>
                      <div>Ball Recovery: {p.ball_recovery.toFixed(1)}</div>
                      <div>Chance Creation: {p.x.toFixed(1)}</div>
                      <div>Chance Conversion: {p.y.toFixed(2)}</div>
                      <div>Pressure: {p.z.toFixed(1)}</div>
                      <div>Aerial: {p.color.toFixed(1)}</div>
                    </div>
                  );
                }
                return null;
              }}
            />

         <Scatter
  name="Teams"
  data={scatterData} //eslint-disable-next-line
  shape={(props: any) => {
    const { cx, cy, z, payload } = props;
    const radius = Math.max(z / 4, 8);
    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={getColor(payload.color)}
        stroke="#fff"
        strokeWidth={1}
      />
    );
  }}
/>
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TeamsRadarScatter;
