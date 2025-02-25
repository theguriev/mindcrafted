import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FC } from "react";
import { ResponsiveContainer, LineChart, YAxis, Tooltip, Line } from "recharts";

const chestData = [
  { date: "2024-02-16", value: 113 },
  { date: "2024-02-17", value: 113 },
  { date: "2024-02-18", value: 114 },
  { date: "2024-02-19", value: 114 },
  { date: "2024-02-20", value: 114 },
  { date: "2024-02-21", value: 115 },
  { date: "2024-02-22", value: 115 },
];

const getStats = (data: typeof chestData) => {
  const currentMeasurement = data[data.length - 1].value;
  const initialMeasurement = data[0].value;
  const totalChange = currentMeasurement - initialMeasurement;
  const weeklyChange = (totalChange / (data.length - 1)).toFixed(2);
  return { currentMeasurement, initialMeasurement, totalChange, weeklyChange };
};

const shoulderStats = getStats(chestData);

const minValue = Math.min(...chestData.map((d) => d.value));
const maxValue = Math.max(...chestData.map((d) => d.value));
const domain = [minValue - 1, maxValue + 1];

const HipsPage: FC = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Загальна зміна</CardTitle>
            <CardDescription>
              Зміна з моменту першого вимірювання
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {shoulderStats.totalChange > 0 ? "+" : ""}
              {shoulderStats.totalChange} см
            </div>
            <p className="text-sm text-muted-foreground">
              Від {shoulderStats.initialMeasurement} см до{" "}
              {shoulderStats.currentMeasurement} см
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Середня зміна</CardTitle>
            <CardDescription>Середня зміна за одне вимірювання</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {shoulderStats.weeklyChange} см
            </div>
            <p className="text-sm text-muted-foreground">за один вимір</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Історія розвитку плеча</CardTitle>
          <CardDescription>Ваші виміри з плином часу</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="h-[300px]">
            <LineChart data={chestData}>
              <YAxis domain={domain} hide />
              <Tooltip formatter={(value: number) => `${value} см`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HipsPage;
