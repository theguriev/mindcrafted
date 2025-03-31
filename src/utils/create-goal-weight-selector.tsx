import { UseMeasurementResponse } from "@/hooks/use-measurement-query";
import selectNumber from "./select-number";

const createGoalWeightSelector =
  ({ current, previous }: { current: number; previous: number }) =>
  (data: UseMeasurementResponse) => {
    const { measurements = [] } = data;
    const goal = selectNumber(measurements?.[0]?.meta?.value);
    const progress = ((previous - current) / (previous - goal)) * 100 || 0;
    return {
      goal,
      progress: progress < 0 ? 0 : progress,
      data: measurements,
    };
  };

export default createGoalWeightSelector;
