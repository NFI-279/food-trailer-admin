// src/features/analytics/components/revenue-chart.tsx
"use client";

import { useAnalyticsChart } from "../hooks";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  revenue: {
    label: "Revenue (RON)",
    color: "hsl(var(--primary))",
  },
};

export function RevenueChart() {
  const { data: chartData, isLoading } = useAnalyticsChart();

  if (isLoading || !chartData) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  // Calculate the total 7-day revenue for the header
  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Last 7 Days</CardTitle>
        <CardDescription>
          Total Revenue: <span className="font-bold text-foreground">{totalRevenue.toFixed(2)} RON</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[350px]">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}