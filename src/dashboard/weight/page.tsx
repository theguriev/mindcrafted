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
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  LineChart,
  ReferenceLine,
} from "recharts";

const WeightPage: FC = () => {
  // In a real app, this would come from your API/database
  const data = [
    { date: "2024-02-16", weight: 76.2 },
    { date: "2024-02-17", weight: 76.0 },
    { date: "2024-02-18", weight: 65.8 },
    { date: "2024-02-19", weight: 75.9 },
    { date: "2024-02-20", weight: 75.7 },
    { date: "2024-02-21", weight: 75.6 },
    { date: "2024-02-22", weight: 70.5 },
  ];

  const height = 1.75; // meters
  const currentWeight = data[data.length - 1].weight;
  const bmi = currentWeight / (height * height);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const weightChange = data[0].weight - data[data.length - 1].weight;
  const trend =
    weightChange > 0 ? "Lost" : weightChange < 0 ? "Gained" : "Maintained";

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ІМТ</CardTitle>
            <CardDescription>Індекс маси тіла</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bmi.toFixed(1)}</div>
            <p className="text-sm text-muted-foreground">
              {getBMICategory(bmi)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Щотижневі зміни</CardTitle>
            <CardDescription>Зміна ваги за останній тиждень</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.abs(weightChange).toFixed(1)} kg
            </div>
            <p className="text-sm text-muted-foreground">{trend}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Історія ваги</CardTitle>
          <CardDescription>Ваша вага за останній тиждень</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="h-[300px]">
            <LineChart data={data}>
              <ReferenceLine y={70} label="Ціль" stroke="red" />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              {/* <YAxis tickFormatter={(value) => `${value.toFixed(1)} kg`} /> */}
              <Tooltip
                formatter={(value: number) => `${value.toFixed(1)} kg`}
              />
              {["weight"].map((category, i) => (
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

export default WeightPage;
