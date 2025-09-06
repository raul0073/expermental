export  const TEAM_TABLE_HEADERS = [
  {
    key: "avg_m",
    label: "Avg M",
    desc: `Represents the team's overall mental strength — it's the average M-Score across all players who played over 600 minutes. 
A higher value suggests a more mentally solid and cohesive squad.`,
  },
  {
    key: "spread_m",
    label: "Spread",
    desc: `Measures the gap between the top and bottom M-Score in the team.
A larger spread implies inconsistency — a mentally strong leader but also weak links.
A smaller spread indicates mental balance and uniformity.`,
  },
  {
    key: "leader",
    label: "Leader",
    desc: `The player with the highest M-Score in the team.
Often the team's mental anchor — resilient, composed, and consistent across games.`,
  },
];

export const PLAYERS_TABLE_HEADERS = [
  {
    key: "mental.m",
    label: "Mental",
    desc: `The player's overall Mental Score (M-Score), ranging from 0 to 100.
It captures traits such as resilience, composure, and decision-making, derived from multiple stats.
Higher values indicate stronger mental attributes and consistency under pressure.`,
  },
  {
    key: "ranking.performance",
    label: "Performance",
    desc: `The player's overall Performance Score, ranging from 0 to 100.
It is a composite metric that weighs key role-specific statistics (defensive, creative, or attacking) to represent total footballing contribution.
Higher values reflect greater on-pitch impact for their role.`,
  },
];
