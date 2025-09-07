"use client";

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const subjectPerformanceData = [
  { subject: "Math", score: 88 },
  { subject: "Science", score: 92 },
  { subject: "History", score: 78 },
  { subject: "English", score: 85 },
  { subject: "Art", score: 95 },
];

const subjectPerformanceChartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function SubjectPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={subjectPerformanceChartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={subjectPerformanceData}>
            <XAxis
              dataKey="subject"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              domain={[0, 100]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="score" fill="var(--color-score)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const progressData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 72 },
    { month: "Apr", score: 80 },
    { month: "May", score: 85 },
    { month: "Jun", score: 88 },
];

const progressChartConfig = {
    score: {
      label: "Avg. Score",
      color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export function ProgressChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={progressChartConfig} className="h-64 w-full">
                    <LineChart
                        accessibilityLayer
                        data={progressData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                        />
                         <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={12}
                            domain={[50, 100]}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Line
                            dataKey="score"
                            type="monotone"
                            stroke="var(--color-score)"
                            strokeWidth={2}
                            dot={true}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
