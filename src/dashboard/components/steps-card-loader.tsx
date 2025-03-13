import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import { FC } from "react";
import StepsCard from "./steps-card";

const StepsCardLoader: FC = () => {
  const { data: steps } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "steps", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: (data) => {
        return data.measurements?.[0]?.meta?.value || 0;
      },
    },
  });

  const { data: goal } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "goal-steps", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: (data) => {
        return data?.measurements?.[0]?.meta?.value || 0;
      },
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
