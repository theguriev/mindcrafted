import { UseMeasurementResponse } from "@/hooks/use-measurement-query";

const selectFirstMeasurementValue = (data: UseMeasurementResponse) =>
  data?.measurements?.[0]?.meta?.value || 0;

export default selectFirstMeasurementValue;
