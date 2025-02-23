import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FC } from "react";

const data = [
  { date: "2024-02-16", steps: 8234 },
  { date: "2024-02-17", steps: 7891 },
  { date: "2024-02-18", steps: 9123 },
  { date: "2024-02-19", steps: 5467 },
  { date: "2024-02-20", steps: 12345 },
  { date: "2024-02-21", steps: 8765 },
  { date: "2024-02-22", steps: 6789 },
];

const averageSteps = Math.round(
  data.reduce((acc, day) => acc + day.steps, 0) / data.length
);

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const StepsPage: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Середньотижневий показник</CardTitle>
            <CardDescription>
              Середня кількість кроків за день на цьому тижні
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {averageSteps.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Загальна кількість кроків</CardTitle>
            <CardDescription>
              Загальна кількість кроків на цьому тижні
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {data.reduce((acc, day) => acc + day.steps, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Щоденні кроки</CardTitle>
          <CardDescription>
            Кількість ваших кроків за минулий тиждень
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepsPage;
