import { FC } from "react";
import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import HipsCard from "./hips-card";

const HipsCardLoader: FC = () => {
  const {
    data: { hipChange, hipData, currentHip },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "hips", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: (data) => {
        const { measurements = [] } = data;
        const hipData = measurements.map((measurement) => ({
          date: new Date(Number(measurement.timestamp)).toISOString(),
          value: Number(measurement.meta?.value) || 0,
        }));
        const currentHip = hipData[hipData.length - 1]?.value || 0;
        const previousHip = hipData[hipData.length - 2]?.value || 0;
        const hipChange = currentHip - previousHip;
        return { hipData, currentHip, hipChange };
      },
    },
  });
  return (
    <HipsCard
      hipsChange={hipChange}
      hipsData={hipData}
      currentHips={currentHip}
    />
  );
};

HipsCardLoader.displayName = "HipsCardLoader";

export default HipsCardLoader;
