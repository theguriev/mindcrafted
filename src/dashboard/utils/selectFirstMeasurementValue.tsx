import { UseMeasurementResponse } from "@/hooks/useMeasurementQuery";

const selectFirstMeasurementValue = (data: UseMeasurementResponse) =>
  data?.measurements?.[0]?.meta?.value || 0;

export default selectFirstMeasurementValue;
