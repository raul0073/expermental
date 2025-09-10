"use client"

import { TeamDefaultChartData } from "@/app/(main)/(dashboard)/utils/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from "recharts"
import { extractBestAndWorstAreasFromChartData, RadarDatum, TEAM_RADAR_CATEGORY_LABELS } from "./utils"

type Props = {
  data: TeamDefaultChartData
  teamName: string;
  className?:string
}


export function TeamDefaultRadarVsLeagueBest({ data, className, teamName }: Props) {
  // Convert API data into radar chart array
  const radarData: RadarDatum[] = Object.entries(data.data).map(
    ([category, stats]) => {
      // Compute normalized team average for this category
      const statValues = Object.values(stats)
      const teamAvg =
        statValues.reduce((sum, s) => sum + (s.team_normalized ?? 0), 0) /
        statValues.length
      // Find the league best value for tooltip
      const leagueBestStat = statValues.reduce((best, s) =>
        s.league_normalized! > (best.league_normalized ?? 0) ? s : best
      //eslint-disable-next-line
      , {} as any)

      return {
        category,
        team: Math.round(teamAvg),
        leagueBest: leagueBestStat?.league_normalized ?? 100,
        leagueBestTeam: leagueBestStat?.league_best_team,
        leagueBestValue: leagueBestStat?.league_best_value,
      }
    }
  )

  const colors = ["hsl(var(--chart-1)", "var(--chart-2))"]
const chartConfig = {
  team: { label: "Team", color: "var(--chart-1)" },
  leagueBest: { label: "League Best", color: "var(--chart-2)" },
} as const
  // Custom tooltip to show league leader 
  //eslint-disable-next-line
  const renderTooltip = (props: any) => {
    const { active, payload } = props
    if (active && payload && payload.length) {
      const data = payload[0].payload as RadarDatum
      return (
        <div className="p-2 bg-muted rounded shadow border text-sm">
          <div className="font-medium">{data.category}</div>
          <div>Team: {data.team}</div>
          {data.leagueBestTeam && (
            <div>
              League Best: {data.leagueBest} ({data.leagueBestTeam} -{" "}
              {data.leagueBestValue})
            </div>
          )}
        </div>
      )
    }
    return null
  }
  const worstAndBestAreas = extractBestAndWorstAreasFromChartData(radarData)
 
  return (
      <Card className={cn("h-fit gap-2", className)}>
      <CardHeader className="gap-0">
        <CardTitle>{teamName}  Mental Radar</CardTitle>
        <CardDescription>
          Team performance vs. league top per mental category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            width={350}
            height={350}
            data={radarData}
          >
            <PolarGrid />
            <PolarAngleAxis 
  dataKey="category"
  tickFormatter={(value) => TEAM_RADAR_CATEGORY_LABELS[value] ?? value}
/>
            <Tooltip content={renderTooltip} cursor={false} />
            <Radar
              name="Team"
              dataKey="team"
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.6}
            />
            <Radar
              name="League Best"
              dataKey="leagueBest"
              stroke={colors[1]}
              fill={colors[1]}
              fillOpacity={0.3}
            />
            <ChartLegend className="mt-4" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
         {worstAndBestAreas.keyArea} <ArrowBigUp className="h-4 w-4 fill-lime-600 text-lime-600/90" /> 
        </div>
        <div className="flex items-center gap-2 leading-none font-medium">
         {worstAndBestAreas.worstCategory} <ArrowBigDown className="h-4 w-4 fill-destructive text-destructive/90" /> 
        </div>
      </CardFooter>
    </Card>
  )
}
