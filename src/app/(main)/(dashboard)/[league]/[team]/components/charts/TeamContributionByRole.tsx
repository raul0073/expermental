"use client"

import { Player } from "@/app/(main)/(dashboard)/utils/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

interface Props {
  players: Player[]
  teamName: string
  className?: string
}

interface ContributionMetric {
  statGroup: string
  key: string
}

interface ContributionData {
  label: string
  [key: string]: number | string
}

// === Zone mapping ===
const ROLE_TO_ZONE: Record<string, string> = {
  GK: "def",
  CB: "def",
  LCB: "def",
  RCB: "def",
  LB: "def",
  RB: "def",
  FB: "def",
  DM: "mid",
  CM: "mid",
  AM: "att",
  RW: "att",
  LW: "att",
  CF: "att",
}

// === Side mapping ===
const ROLE_TO_SIDE: Record<string, string> = {
  GK: "central",
  CB: "central",
  LCB: "central",
  RCB: "central",
  LB: "left",
  RB: "right",
  FB: "left",
  DM: "central",
  CM: "central",
  AM: "central",
  RW: "left",
  LW: "right",
  CF: "central",
  ST: "central"
}

// === Metrics ===
const ATTACK_METRICS: ContributionMetric[] = [
  { statGroup: "goal_shot_creation", key: "SCA - SCA90" },
  { statGroup: "goal_shot_creation", key: "GCA - GCA90" },
  { statGroup: "standard", key: "Expected - xG" },
]

const DEFENSE_METRICS: ContributionMetric[] = [
  { statGroup: "defense", key: "Challenges - Tkl%" },
  { statGroup: "defense", key: "Tkl+Int" },
  { statGroup: "defense", key: "Tackles - Att 3rd" },
  { statGroup: "defense", key: "Clr" },
  { statGroup: "defense", key: "Blocks - Blocks" },
]

// === Aggregate by zone ===
const aggregateByZoneSide = (
  players: Player[],
  metrics: ContributionMetric[]
): ContributionData[] => {
  const matrix: Record<string, ContributionData> = {}
  const zones = ["def", "mid", "att"]
  const sides = ["left", "central", "right"]

  // initialize all combinations
  zones.forEach((z) => {
    sides.forEach((s) => {
      const label = `${z.toUpperCase()}-${s.toUpperCase()}`
      matrix[label] = { label }
      metrics.forEach((m) => {
        matrix[label][m.key] = 0
      })
    })
  })

  // sum contributions
  players.forEach((p) => {
  const zone = ROLE_TO_ZONE[p.role] || "Unknown"
  const side = ROLE_TO_SIDE[p.role] || "central"
  const label = `${zone.toUpperCase()}-${side.toUpperCase()}`

  // Initialize row if it doesn't exist
  if (!matrix[label]) {
    matrix[label] = { label } as ContributionData
  }

  metrics.forEach((m) => {
    const val = p.stats?.[m.statGroup]?.[m.key] ?? 0
    // Initialize stat if it doesn't exist yet
    if (!matrix[label][m.key]) matrix[label][m.key] = 0
    matrix[label][m.key] = (matrix[label][m.key] as number) + val
  })
})

  return Object.values(matrix)
}

// === Component ===
export default function TeamContributionByRole({ players, teamName, className }: Props) {
  const attackData = aggregateByZoneSide(players, ATTACK_METRICS)
  const defenseData = aggregateByZoneSide(players, DEFENSE_METRICS)

  return (
   <Card className={cn("w-full", className)}>
    <CardHeader>
          <CardTitle>{teamName} - Attack and Defensive Contributions</CardTitle>
          <CardDescription>Players contribution by zone & side</CardDescription>
    </CardHeader>
     <CardContent className="p-0 flex flex-col md:flex-row gap-1 h-full">
      {/* === Attack chart === */}
           <Card className="border-none shadow-none w-full h-1/2">
       <CardHeader className="gap-2 py-0">
        <CardDescription>
          {teamName} <span className="text-primary/80">attacking</span> contribution by zones <br />
        </CardDescription>
      </CardHeader>
        <CardContent className="p-0">
          <ChartContainer
          className="aspect-video"
            config={{
              "Performance - Gls": { label: "Goals", color: "hsl(var(--chart-1))" },
              "Performance - Ast": { label: "Assists", color: "hsl(var(--chart-2))" },
              "Performance - G+A": { label: "Goals + Assists", color: "hsl(var(--chart-3))" },
            }}
          >
            <LineChart
              accessibilityLayer
              data={attackData}
              margin={{ top: 20, left: 12, right: 12, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {ATTACK_METRICS.map((m, idx) => (
                <Line
                  key={m.key}
                  dataKey={m.key}
                  type="natural"
                  stroke={`hsl(var(--chart-${idx + 1}))`}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                >
                  <LabelList position="top" className="fill-foreground" fontSize={12} />
                </Line>
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* === Defense chart === */}
     <Card className="border-none shadow-none w-full h-1/2">
       <CardHeader className="gap-2 py-0">
        <CardDescription>
          {teamName} <span className="text-primary/80">defensive</span> contribution by zones <br />
        </CardDescription>
      </CardHeader>
        <CardContent className="p-0">
          <ChartContainer
            config={{
              Tackles_Tkl: { label: "Tackles", color: "hsl(var(--chart-1))" },
              Int: { label: "Interceptions", color: "hsl(var(--chart-2))" },
              Clr: { label: "Clearances", color: "hsl(var(--chart-3))" },
              "Blocks - Blocks": { label: "Blocks", color: "hsl(var(--chart-4))" },
            }}
          >
            <LineChart
              accessibilityLayer
              data={defenseData}
              margin={{ top: 20, left: 12, right: 12, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {DEFENSE_METRICS.map((m, idx) => (
                <Line
                  key={m.key}
                  dataKey={m.key}
                  type="natural"
                  stroke={`hsl(var(--chart-${idx + 1}))`}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                >
                  <LabelList position="top" className="fill-foreground" fontSize={12} />
                </Line>
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </CardContent>
   </Card>
  )
}
