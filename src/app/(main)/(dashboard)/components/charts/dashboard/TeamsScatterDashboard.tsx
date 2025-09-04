"use client";

import { LEAGUES_NAME } from "@/lib/Types/LABELS";
import {
  CartesianGrid,
  Legend,
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
};

function TeamsScatterDashboard({ teams }: Props) {
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
    const hue = (value / 100) * 120; // red to green
    return `hsl(${hue}, 70%, 50%)`;
  };



  return (
    <div className="w-full h-[600px] p-4 bg-transparent rounded-lg shadow-md relative">
      {/* Quadrant labels */}
      <div className="absolute top-2 right-2 font-bold text-gray-600">
        Strong but inconsistent
      </div>
      <div className="absolute top-2 left-2 font-bold text-gray-600">
        Weak & inconsistent
      </div>
      <div className="absolute bottom-2 right-2 font-bold text-gray-600">
        Strong & balanced
      </div>
      <div className="absolute bottom-2 left-2 font-bold text-gray-600">
        Weak but consistent
      </div>

      <ResponsiveContainer width="100%" height="100%">
        
        <ScatterChart margin={{ top: 20, right: 10, bottom: 20, left: 10 }}>
            <Legend  style={{
            position: 'absolute',
            top: 0,
            left: 10,
            
          }} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name="Avg Mental"
            label={{ value: "Avg Mental Score", position: "bottom", offset: 0 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Mental Spread"
            label={{
              value: "Mental Spread",
              angle: -90,
              position: "insideLeft",
            }}
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
                    <div>Avg M: {p.x}</div>
                    <div>Spread M: {p.y}</div>
                    <div>Squad Size: {p.z}</div>
                    <div>
                      Leader: {p.leader} ({p.leaderM})
                    </div>
                    <div>
                      Weakest: {p.weakest} ({p.weakestM})
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Scatter name="Teams" data={scatterData} fill="#8884d8">
            {scatterData.map((entry, index) => (
              <circle
                key={`circle-${index}`}
                cx={0}
                cy={0}
                r={(entry.z / 2) || 10}
                fill={getColor(entry.color)}
                stroke="#ffff"
              />
            ))}
          </Scatter>
          
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TeamsScatterDashboard;
