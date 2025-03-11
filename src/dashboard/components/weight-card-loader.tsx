import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import { FC } from "react";
import selectBodyMeasurement from "../utils/selectBodyMeasurement";
import WeightCard from "./weight-card";

const WeightCardLoader: FC = () => {
  const {
    data: { change, current, previous },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "weight", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: selectBodyMeasurement,
    },
  });

  const {
    data: { goal, progress },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "goal-weight", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: (data) => {
        const { measurements = [] } = data;
        const goal = measurements?.[0]?.meta?.value || 0;
        const progress = ((previous - current) / (previous - goal)) * 100;
        return {
          goal,
          progress: isNaN(progress) ? 0 : progress,
          data: measurements,
        };
      },
    },
  });

  return (
    <WeightCard
      change={change}
      current={current}
      goal={goal}
      progress={progress}
    />
  );
};

WeightCardLoader.displayName = "WeightCardLoader";

export default WeightCardLoader;
