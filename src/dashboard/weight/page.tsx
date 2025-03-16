import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import { FC, useMemo } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Line,
  LineChart,
  ReferenceLine,
} from "recharts";
import selectFirstMeasurementValue from "../utils/selectFirstMeasurementValue";
import selectBodyMeasurement from "../utils/selectBodyMeasurement";
import getBMICategory from "../utils/getBMICategory";

const WeightPage: FC = () => {
  const { data: height } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "height", limit: 1, offset: 0 },
    },
    queryOptions: {
      select: selectFirstMeasurementValue,
    },
  });

  const {
    data: { data },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "weight", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: selectBodyMeasurement,
    },
  });

  const { bmi, weightChange, trend } = useMemo(() => {
    if (data.length === 0) {
      return {
        currentWeight: 0,
        bmi: 0,
        weightChange: 0,
        trend: "Збережено",
      };
    }
    const currentWeight = data[data.length - 1].value;
    const bmi = currentWeight / (height * height);

    const weightChange = data[0].value - data[data.length - 1].value;
    const trend =
      weightChange > 0 ? "Втрачено" : weightChange < 0 ? "Набуто" : "Збережено";
    return {
      bmi,
      weightChange,
      trend,
    };
  }, [data, height]);

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
              {Math.abs(weightChange).toFixed(1)} кг
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
