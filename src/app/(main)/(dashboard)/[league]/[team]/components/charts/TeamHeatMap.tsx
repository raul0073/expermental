"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TeamDefaultChartData } from "@/app/(main)/(dashboard)/utils/types"

type Props = { data: TeamDefaultChartData }

// Zones mapped to stats
const pitchZones: Record<string, string[]> = {
  "Defensive Third": ["Challenges_Tkl%", "Performance_Recov", "Aerial Duels_Won%"],
  "Middle Third": ["Receiving_PrgR", "PPA", "Touches_Live"],
  "Attacking Third": ["Performance_Gls", "KP", "SCA_SCA90", "Take-Ons_Succ%"],
}

// Build chartConfig dynamically
const chartConfig: ChartConfig = {
  team: {
    label: "Team Gap",
    color: "var(--chart-1)",
  },
  league: {
    label: "League Best",
    color: "var(--chart-2)",
  },
}

export function TeamPitchZoneStackedExpand({ data }: Props) {
  // Transform data into chart-friendly format
  const chartData = Object.entries(pitchZones).map(([zone, stats]) => {
    const teamVals: number[] = []
    const leagueVals: number[] = []

    stats.forEach((statKey) => {
      const stat = Object.values(data.data)
        .flatMap((cat) => Object.entries(cat))
        .find(([k]) => k === statKey)?.[1]

      if (stat) {
        const gap = stat.team_normalized - stat.league_normalized
        teamVals.push(gap) // negative = behind, positive = above
        leagueVals.push(0) // baseline
      }
    })

    const avgTeam =
      teamVals.length > 0
        ? teamVals.reduce((a, b) => a + b, 0) / teamVals.length
        : 0

    return {
      zone,
      team: avgTeam,
      league: 0,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pitch Zone Performance - Stacked Expand</CardTitle>
        <CardDescription>
          Team vs League Best (stacked proportionally)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            stackOffset="expand"
            margin={{ left: 12, right: 12, top: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="zone"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <defs>
              <linearGradient id="fillTeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLeague" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="league"
              stroke="hsl(var(--chart-2))"
              fill="url(#fillLeague)"
              stackId="a"
            />
            <Area
              type="monotone"
              dataKey="team"
              stroke="hsl(var(--chart-1))"
              fill="url(#fillTeam)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Pitch zones comparison vs league best
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
