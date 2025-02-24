import { Bar, BarChart, CartesianGrid, ReferenceLine, XAxis } from "recharts";
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
  { date: "2024-06-01", steps: 1234 },
  { date: "2024-06-02", steps: 5678 },
  { date: "2024-06-03", steps: 9012 },
  { date: "2024-06-04", steps: 3456 },
  { date: "2024-06-05", steps: 7890 },
  { date: "2024-06-06", steps: 1234 },
  { date: "2024-06-07", steps: 5678 },
  { date: "2024-06-08", steps: 9012 },
  { date: "2024-06-09", steps: 3456 },
  { date: "2024-06-10", steps: 7890 },
  { date: "2024-06-11", steps: 1234 },
  { date: "2024-06-12", steps: 5678 },
  { date: "2024-06-13", steps: 9012 },
  { date: "2024-06-14", steps: 3456 },
  { date: "2024-06-15", steps: 7890 },
  { date: "2024-06-16", steps: 1234 },
  { date: "2024-06-17", steps: 5678 },
  { date: "2024-06-18", steps: 9012 },
  { date: "2024-06-19", steps: 3456 },
  { date: "2024-06-20", steps: 7890 },
  { date: "2024-06-21", steps: 1234 },
  { date: "2024-06-22", steps: 5678 },
  { date: "2024-06-23", steps: 9012 },
  { date: "2024-06-24", steps: 3456 },
  { date: "2024-06-25", steps: 7890 },
  { date: "2024-06-26", steps: 1234 },
  { date: "2024-06-27", steps: 5678 },
  { date: "2024-06-28", steps: 9012 },
  { date: "2024-06-29", steps: 3456 },
  { date: "2024-06-30", steps: 7890 },
  // 50 more
  { date: "2024-07-01", steps: 1234 },
  { date: "2024-07-02", steps: 5678 },
  { date: "2024-07-03", steps: 9012 },
  { date: "2024-07-04", steps: 3456 },
  { date: "2024-07-05", steps: 7890 },
  { date: "2024-07-06", steps: 1234 },
  { date: "2024-07-07", steps: 5678 },
  { date: "2024-07-08", steps: 9012 },
  { date: "2024-07-09", steps: 3456 },
  { date: "2024-07-10", steps: 7890 },
  { date: "2024-07-11", steps: 1234 },
  { date: "2024-07-12", steps: 5678 },
  { date: "2024-07-13", steps: 9012 },
  { date: "2024-07-14", steps: 3456 },
  { date: "2024-07-15", steps: 7890 },
  { date: "2024-07-16", steps: 1234 },
  { date: "2024-07-17", steps: 5678 },
  { date: "2024-07-18", steps: 9012 },
  { date: "2024-07-19", steps: 3456 },
  { date: "2024-07-20", steps: 7890 },
  { date: "2024-07-21", steps: 1234 },
  { date: "2024-07-22", steps: 5678 },
  { date: "2024-07-23", steps: 9012 },
  { date: "2024-07-24", steps: 3456 },
  { date: "2024-07-25", steps: 7890 },
  { date: "2024-07-26", steps: 1234 },
  { date: "2024-07-27", steps: 5678 },
  { date: "2024-07-28", steps: 9012 },
];

const averageSteps = Math.round(
  data.reduce((acc, day) => acc + day.steps, 0) / data.length
);

const chartConfig = {
  desktop: {
    label: "Steps",
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
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart accessibilityLayer data={data}>
              <ReferenceLine y={7000} label="Ціль" stroke="red" />
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="steps" fill="var(--color-desktop)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepsPage;
