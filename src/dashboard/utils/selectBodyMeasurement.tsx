import { UseMeasurementResponse } from "@/hooks/useMeasurementQuery";

const selectBodyMeasurement = (data: UseMeasurementResponse) => {
  const { measurements = [] } = data;
  const bodyData = measurements.map((measurement) => ({
    date: new Date(Number(measurement.timestamp)).toISOString(),
    value: Number(measurement.meta?.value) || 0,
  }));
  const current = bodyData[bodyData.length - 1]?.value || 0;
  const previous = bodyData[bodyData.length - 2]?.value || 0;
  const change = current - previous;
  return { data: bodyData, current, change, previous };
};

export default selectBodyMeasurement;
