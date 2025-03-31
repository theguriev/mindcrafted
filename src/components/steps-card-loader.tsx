import { useMeasurementQuery } from "@/hooks/use-measurement-query";
import { FC } from "react";
import StepsCard from "./steps-card";
import selectFirstMeasurementValue from "../utils/select-first-measurement-value";
import selectNumber from "@/utils/select-number";
import { flow } from "es-toolkit/compat";

const StepsCardLoader: FC = () => {
  const { data: steps } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "steps", limit: 1, offset: 0 },
    },
    queryOptions: {
      select: flow(selectFirstMeasurementValue, selectNumber),
    },
  });

  const { data: goal } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "goal-steps", limit: 1, offset: 0 },
    },
    queryOptions: {
      select: flow(selectFirstMeasurementValue, selectNumber),
    },
  });

  const progress = (steps / goal) * 100 || 0;

  return <StepsCard steps={steps} goal={goal} progress={progress} />;
};

StepsCardLoader.displayName = "StepsCardLoader";

export default StepsCardLoader;
