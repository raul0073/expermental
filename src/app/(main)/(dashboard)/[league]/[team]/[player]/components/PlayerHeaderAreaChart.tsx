'use client'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Player } from "@/app/(main)/(dashboard)/utils/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

const PLAYER_STATS_KEYS = [
  "Non-Penalty Goals",
  "npxG: Non-Penalty xG",
  "Shots Total",
  "Assists",
  "xAG: Exp. Assisted Goals",
  "npxG + xAG",
  "Shot-Creating Actions",
  "Passes Attempted",
  "Pass Completion %",
  "Progressive Passes",
  "Progressive Carries",
  "Successful Take-Ons",
  "Touches (Att Pen)",
  "Progressive Passes Rec",
  "Tackles",
  "Interceptions",
  "Blocks",
  "Clearances",
  "Aerials Won",
]

type Props = {
  player: Player
  className?: string
}

export function PlayerHeaderAreaChart({ player, className }: Props) {
  const radarData = useMemo(() => {
    if (!player.player_365_stats) return []
    
    return PLAYER_STATS_KEYS.map((key) => {
      const k = key as keyof typeof player.player_365_stats.percentiles
      return {
        stat: key,
        per90: player.player_365_stats.per90[key as keyof typeof player.player_365_stats.per90] ?? 0,
        percentile: player.player_365_stats.percentiles[k] ?? 0,
      }
    })
  }, [player.player_365_stats])
  
  if(!player.player_365_stats) return null
  const chartData = radarData.map((d) => ({
    stat: d.stat,
    percentile: d.percentile,
  }))

  const chartConfig = radarData.reduce((acc, d) => {
    acc[d.stat] = { label: d.stat, color: "var(--chart-1)" }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  return (
    <Card className={cn("h-full w-full border-none p-0", className)}>
      <CardHeader>
        <CardDescription>
          {player.name} {`compared to positional peers in Men's Big 5 Leagues.`} <br />
          <small>UCL, UEL for {player.player_365_stats?.position_pool || "No category role."} </small>

        </CardDescription>

      </CardHeader>
      <CardContent className="full p-0 h-fit">
        <ChartContainer config={chartConfig} className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 20, right: 0, left: 0, bottom: 50 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="stat"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                angle={-35}
                textAnchor="end"
                fontSize={10}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="percentile"
                type="natural"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
                stroke="hsl(var(--chart-1))"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
