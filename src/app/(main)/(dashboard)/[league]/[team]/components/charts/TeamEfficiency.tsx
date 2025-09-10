"use client"

import { TeamDefaultChartData } from "@/app/(main)/(dashboard)/utils/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { Bar, BarChart, CartesianGrid, Scatter, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
  data: TeamDefaultChartData
  teamName: string;
  className?:string
}
export const comboChartConfig = {
  efficiency: {
    label: "Team Efficiency",
    color: "var(--chart-1)",
    type: "bar",
  },
  leagueEfficiency: {
    label: "League Best Efficiency",
    color: "var(--chart-2)",
    type: "bar",
  },
  creativity: {
    label: "Team Creativity",
    color: "var(--chart-3)",
    type: "scatter",
  },
  leagueCreativity: {
    label: "League Best Creativity",
    color: "var(--chart-4)",
    type: "scatter",
  },
} satisfies ChartConfig
type ComboChartDatum = {
  category: string
  efficiency: number
  leagueEfficiency: number
  creativity: number
  leagueCreativity: number
}

export function TeamComboChart({ data, className, teamName }: Props) {
  // Prepare combo chart data
  const chartData: ComboChartDatum[] = Object.entries(data.data).map(([category, stats]) => {
    // Aggregate efficiency metrics: Decision Making & Composure
    const efficiencyKeys = [
      "Performance_Gls",
      "Expected_xG",
      "Expected_npxG+xAG",
      "Standard_SoT%",
      "Standard_G/SoT",
      "Expected_G-xG",
      "Expected_np:G-xG",
    ].filter((k) => k in stats)

    const efficiencyValues = efficiencyKeys.map((k) => stats[k].team_normalized)
    const leagueEfficiencyValues = efficiencyKeys.map((k) => stats[k].league_normalized)

    // Aggregate creativity/progression metrics: Initiative & Penetration
    const creativityKeys = [
      "PPA",
      "1/3",
      "Receiving_PrgR",
      "Touches_Live",
      "SCA_SCA90",
      "GCA_GCA90",
      "KP",
      "Take-Ons_Succ%",
      "Touches_Att Pen",
      "Carries_CPA",
    ].filter((k) => k in stats)

    const creativityValues = creativityKeys.map((k) => stats[k].team_normalized)
    const leagueCreativityValues = creativityKeys.map((k) => stats[k].league_normalized)

    return {
      category: category.replace(" / ", "\n"), // Optional label formatting
      efficiency: efficiencyValues.length ? efficiencyValues.reduce((a, b) => a + b, 0) / efficiencyValues.length : 0,
      leagueEfficiency: leagueEfficiencyValues.length ? leagueEfficiencyValues.reduce((a, b) => a + b, 0) / leagueEfficiencyValues.length : 0,
      creativity: creativityValues.length ? creativityValues.reduce((a, b) => a + b, 0) / creativityValues.length : 0,
      leagueCreativity: leagueCreativityValues.length ? leagueCreativityValues.reduce((a, b) => a + b, 0) / leagueCreativityValues.length : 0,
    }
  })

  return (
     <Card className={cn("h-fit gap-2", className)}>
      <CardHeader className="gap-0">
        <CardTitle>{teamName} Efficiency & Creativity</CardTitle>
        <CardDescription>Bars = Efficiency, Dots = Creativity vs League Best</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={comboChartConfig} className="mx-auto aspect-square">
          <BarChart
            width={600}
            height={350}
            data={chartData}
            margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />

            {/* Bars = Efficiency */}
            <Bar yAxisId="left" dataKey="efficiency" fill="hsl(var(--chart-1))" barSize={24} name="Team Efficiency" />
            <Bar yAxisId="left" dataKey="leagueEfficiency" fill="hsl(var(--chart-2))" barSize={12} name="League Best Efficiency" />

            {/* Scatter = Creativity */}
            <Scatter yAxisId="right" dataKey="creativity" fill="hsl(var(--chart-3))" name="Team Creativity" />
            <Scatter yAxisId="right" dataKey="leagueCreativity" fill="hsl(var(--chart-4))" name="League Best Creativity" />

            <ChartLegend className="mt-4" content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Season {data.season} - {data.league}
      </CardFooter>
    </Card>
  )
}
