import { UseMeasurementResponse } from "@/hooks/use-measurement-query";

const createGoalWeightSelector =
  ({ current, previous }: { current: number; previous: number }) =>
  (data: UseMeasurementResponse) => {
    const { measurements = [] } = data;
    const goal = measurements?.[0]?.meta?.value || 0;
    const progress = ((previous - current) / (previous - goal)) * 100;
    return {
      goal,
      progress: isNaN(progress) ? 0 : progress,
      data: measurements,
    };
  };

export default createGoalWeightSelector;
