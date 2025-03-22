import { FC } from "react";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

const SparklineChart: FC<{
  data: Array<{ date: string; value: number }>;
}> = ({ data }) => {
  const minValue = Math.min(...data.map((d) => d.value));
  const maxValue = Math.max(...data.map((d) => d.value));
  const domain = [minValue - 1, maxValue + 1];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <YAxis domain={domain} hide />
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
  );
};

SparklineChart.displayName = "SparklineChart";

export default SparklineChart;
