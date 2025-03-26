import { useMeasurementQuery } from "@/hooks/use-measurement-query";
import { FC } from "react";
import selectBodyMeasurement from "../utils/select-body-measurement";
import WeightCard from "./weight-card";
import createGoalWeightSelector from "../utils/create-goal-weight-selector";

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
      select: createGoalWeightSelector({ current, previous }),
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
