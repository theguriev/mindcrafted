import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FC } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";

const shoulderData = [
  { date: "2024-02-16", value: 113 },
  { date: "2024-02-17", value: 113 },
  { date: "2024-02-18", value: 114 },
  { date: "2024-02-19", value: 114 },
  { date: "2024-02-20", value: 114 },
  { date: "2024-02-21", value: 115 },
  { date: "2024-02-22", value: 115 },
];

const getStats = (data: typeof shoulderData) => {
  const currentMeasurement = data[data.length - 1].value;
  const initialMeasurement = data[0].value;
  const totalChange = currentMeasurement - initialMeasurement;
  const weeklyChange = (totalChange / (data.length - 1)).toFixed(2);
  return { currentMeasurement, initialMeasurement, totalChange, weeklyChange };
};

const shoulderStats = getStats(shoulderData);

const ShoulderPage: FC = () => {
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
            <LineChart data={shoulderData}>
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value: number) => `${value} см`} />
              <Tooltip formatter={(value: number) => `${value} см`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              {["value"].map((category, i) => (
                <Line
                  key={category}
                  type="monotone"
                  dataKey={category}
                  stroke={["#2563eb"][i % ["#2563eb"].length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoulderPage;
