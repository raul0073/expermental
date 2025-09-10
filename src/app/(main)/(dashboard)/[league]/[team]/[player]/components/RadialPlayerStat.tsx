'use client'

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A generic radial chart with max scaling"

type ChartRadialTextProps = {
  data: {
    label: string
    val: number
    max: number
  }
  className?: string
}

export function ChartRadialText({ data, className }: ChartRadialTextProps) {
  const chartData = [
    {
      label: data.label,
      value: data.val,
      max: data.max,
      fill: "hsl(var(--chart-2))",
    },
  ]

  const chartConfig = {
    value: {
      label: data.label,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart</CardTitle>
        <CardDescription>{data.label}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="value"
              background={{ fill: "#e5e7eb" }}
              cornerRadius={10}
              minPointSize={1}
            />
            <PolarRadiusAxis
              type="number"
              domain={[0, data.max]}
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {data.val.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {data.label}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
