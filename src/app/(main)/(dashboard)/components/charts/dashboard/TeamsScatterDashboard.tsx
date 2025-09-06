"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  ZAxis
} from "recharts";
import { TeamMentalSummary } from "../../../utils/types";

type Props = {
  teams: TeamMentalSummary[];
  className?:string
};

function TeamsScatterDashboard({ teams, className }: Props) {
  
  const scatterData = teams.map((team) => ({
    x: team.avg_m,
    y: team.spread_m,
    z: team.count_players,
    color: team.leader.m,
    team: team.team,
    league: team.league,
    leader: team.leader.player,
    leaderM: team.leader.m,
    weakest: team.weakest.player,
    weakestM: team.weakest.m,
  }));

  const getColor = (value: number) => {
    const hue = (value / 100) * 120; // red -> green
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <Card className={cn("h-fit gap-2", className)}>
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Teams Cohesion Distribution</CardTitle>
        <CardDescription>Avg vs. spread of mental scores per team</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[80vh] md:h-[700px] relative">
        {/* Quadrant labels */}
        <div className="absolute top-2 right-2 font-bold text-gray-600 z-10 text-xs">
          Strong but inconsistent
        </div>
        <div className="absolute top-2 left-2 font-bold text-gray-600 z-10 text-xs">
          Weak & inconsistent
        </div>
        <div className="absolute bottom-2 right-2 font-bold text-gray-600 z-10 text-xs">
          Strong & balanced
        </div>
        <div className="absolute bottom-2 left-2 font-bold text-gray-600 z-10 text-xs">
          Weak but consistent
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              name="Avg Mental"
              domain={[5, 35]} 
              label={{ value: "Avg Mental Score", position: "bottom", offset: 5 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[3, 20]} 
              name="Mental Spread"
              label={{ value: "Mental Spread", angle: -90, position: "insideLeft" }}
            />
            <ZAxis type="number" dataKey="z" range={[50, 300]} name="Squad Size" />
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
                      <div>Avg M: {p.x.toFixed(1)}</div>
                      <div>Spread M: {p.y.toFixed(1)}</div>
                      <div>Squad Size: {p.z}</div>
                      <div>
                        Leader: {p.leader} ({p.leaderM.toFixed(1)})
                      </div>
                      <div>
                        Weakest: {p.weakest} ({p.weakestM.toFixed(1)})
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              name="Teams"
              data={scatterData}
              fill="#8884d8"//eslint-disable-next-line
              shape={(props: any) => {
                const { cx, cy, z, payload } = props;
                const radius = Math.max(z / 2, 8);
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

export default TeamsScatterDashboard;
