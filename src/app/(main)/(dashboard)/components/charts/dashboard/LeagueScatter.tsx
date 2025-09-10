"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import { cn } from "@/lib/utils";
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
import { getTeamLogoUrl } from "../utils/getTeamLogo";
import { useMemo } from "react";

type Props = {
  teams: StatsPayload;
  className?: string;
};

function TeamsRadarScatter({ teams, className }: Props) {
  // flatten raw teams stats
  const flatTeamsData = useMemo(() => buildRadarData(teams), [teams]);

  // organize to mental radar categories
  const organizedData = useMemo(() => getMentalRadarDataForTeams(flatTeamsData), [flatTeamsData]);

  // build scatter data
  const scatterData = useMemo(
    () =>
      Object.entries(organizedData).map(([teamName, stats]) => ({
        x: stats.chance_creation ?? 0,      // X-axis = quality of chances
        y: stats.chance_conversion ?? 0,    // Y-axis = finishing
        z: stats.pressure ?? 0,             // bubble size = intensity / work rate
        color: stats.ball_recovery ?? 0,    // bubble color = aerial dominance
        team: teamName,
        league: stats.league ?? "UNKNOWN",
        passing_quality: stats.passing_quality ?? 0,
        ball_recovery: stats.ball_recovery ?? 0,
        logoUrl: getTeamLogoUrl(teamName, stats.league ?? ""),
      })),
    [organizedData]
  );

  // dynamically compute min/max for X/Y axes
  const xMin = Math.min(...scatterData.map(d => d.x)) - 5;
  const xMax = Math.max(...scatterData.map(d => d.x)) + 5;
  const yMin = Math.min(...scatterData.map(d => d.y));
  const yMax = Math.max(...scatterData.map(d => d.y));

  const quadrantLabels = [
    { text: "Strong & balanced", x: xMax, y: yMax, anchor: "end top" },
    { text: "Clinical but limited", x: xMin, y: yMax, anchor: "start top" },
    { text: "Creative but wasteful", x: xMax, y: yMin, anchor: "end bottom" },
    { text: "Wasteful & inconsistent", x: xMin, y: yMin, anchor: "start bottom" },
  ];

  const getColor = (value: number) => {
    const hue = Math.min(Math.max((value / 100) * 120, 0), 120); // clamp 0-120
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card className={cn("h-fit gap-2", className)}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Team Chances Quality</CardTitle>
        <CardDescription>
          Chances quality: creation vs. conversion, sized by pressure and colored by aerial ability
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[80vh] md:h-[700px] relative">
        {/* Quadrant labels dynamically positioned */}
        {quadrantLabels.map((ql, idx) => (
          <div
            key={idx}
            className="absolute font-bold text-gray-600 text-xs bg-white/30 px-1 rounded z-10"
            style={{
              left: ql.anchor.includes("start") ? 5 : undefined,
              right: ql.anchor.includes("end") ? 5 : undefined,
              top: ql.anchor.includes("top") ? 5 : undefined,
              bottom: ql.anchor.includes("bottom") ? 5 : undefined,
            }}
          >
            {ql.text}
          </div>
        ))}

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 10, bottom: 40, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Chance Creation"
              label={{ value: "Chance Creation", position: "bottom", offset: 5 }}
              domain={[xMin, xMax]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Chance Conversion"
              label={{ value: "Chance Conversion", angle: -90, position: "insideLeft" }}
              domain={[yMin, yMax]}
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
              data={scatterData}//eslint-disable-next-line
              shape={(props: any) => {
                const { cx, cy, z, payload } = props;
                const radius = Math.max(z / 4, 8);
                return (
                  <g>
                    {/* Outer colored circle */}
                    <circle cx={cx} cy={cy} r={radius} fill={getColor(payload.color)} stroke="#fff" strokeWidth={1} />
                    {/* Logo */}
                    {payload.logoUrl && (
                      <image
                        href={payload.logoUrl}
                        x={cx - radius}
                        y={cy - radius}
                        width={radius * 2}
                        height={radius * 2}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                  </g>
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
