
"use client";

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const sanjaySubjectPerformanceData = [
  { subject: "Math", score: 88 },
  { subject: "Science", score: 92 },
  { subject: "History", score: 78 },
  { subject: "English", score: 85 },
  { subject: "Art", score: 95 },
];

const newStudentSubjectPerformanceData = [
  { subject: "Math", score: 0 },
  { subject: "Science", score: 0 },
  { subject: "History", score: 0 },
  { subject: "English", score: 0 },
  { subject: "Art", score: 0 },
];

const subjectPerformanceChartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function SubjectPerformanceChart({ userName }: { userName: string }) {
  const isSanjay = userName.toLowerCase() === 'sanjay sharma' || userName === 'teacher';
  const data = isSanjay ? sanjaySubjectPerformanceData : newStudentSubjectPerformanceData;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={subjectPerformanceChartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={data}>
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

const sanjayProgressData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 72 },
    { month: "Apr", score: 80 },
    { month: "May", score: 85 },
    { month: "Jun", score: 88 },
];

const newStudentProgressData = [
    { month: "Jan", score: 0 },
    { month: "Feb", score: 0 },
    { month: "Mar", score: 0 },
    { month: "Apr", score: 0 },
    { month: "May", score: 0 },
    { month: "Jun", score: 0 },
];

const progressChartConfig = {
    score: {
      label: "Avg. Score",
      color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export function ProgressChart({ userName }: { userName: string }) {
    const isSanjay = userName.toLowerCase() === 'sanjay sharma' || userName === 'teacher';
    const data = isSanjay ? sanjayProgressData : newStudentProgressData;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={progressChartConfig} className="h-64 w-full">
                    <LineChart
                        accessibilityLayer
                        data={data}
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
                            domain={[0, 100]}
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
