import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import { FC } from "react";
import StepsCard from "./steps-card";
import selectFirstMeasurementValue from "../utils/selectFirstMeasurementValue";

const StepsCardLoader: FC = () => {
  const { data: steps } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "steps", limit: 1, offset: 0 },
    },
    queryOptions: {
      select: selectFirstMeasurementValue,
    },
  });

  const { data: goal } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "goal-steps", limit: 1, offset: 0 },
    },
    queryOptions: {
      select: selectFirstMeasurementValue,
    },
  });

  const progress = (steps / goal) * 100;

  return (
    <StepsCard
      steps={steps}
      goal={goal}
      progress={isNaN(progress) ? progress : 0}
    />
  );
};

StepsCardLoader.displayName = "StepsCardLoader";

export default StepsCardLoader;
