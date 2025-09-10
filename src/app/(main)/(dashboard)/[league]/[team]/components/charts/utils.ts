
// Radar chart data type
export type RadarDatum = {
  category: string
  team: number
  leagueBest: number
  rawTeam?: number
  leagueBestTeam?: string
  leagueBestValue?: number
}
export function extractBestAndWorstAreasFromChartData(data: RadarDatum[]) {
  if (data.length === 0) return { keyArea: "-", worstCategory: "-" };

  // Compute average normalized value per category
  const categoryAverages = data.map((cat) => {
    const values = Object.entries(cat)
      .filter(([key, val]) => key !== "category" && typeof val === "number")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, val]) => val as number);
    
    const avg = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0;
    return { category: cat.category, avg };
  });

  // Best category
  const best = categoryAverages.reduce((max, curr) =>
    curr.avg > max.avg ? curr : max
  );

  // Worst category
  const worst = categoryAverages.reduce((min, curr) =>
    curr.avg < min.avg ? curr : min
  );

  return { keyArea: best.category, worstCategory: worst.category };
}
export const TEAM_RADAR_CATEGORY_LABELS: Record<string, string> = {
  "Decision Making": "Decisions",
  "Initiative / Proactivity": "Initiative",
  "Penetration / Creativity": "Creativity",
  "Composure / Efficiency": "Composure",
  "Discipline / Risk Management": "Risk Mgmt",
  "Team Influence / Control": "Control",
}

