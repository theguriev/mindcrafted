import { FC } from "react";
import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import HipsCard from "./hips-card";
import selectBodyMeasurement from "../utils/selectBodyMeasurement";

const HipsCardLoader: FC = () => {
  const {
    data: { change: hipsChange, data: hipsData, current: currentHips },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "hips", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: selectBodyMeasurement,
    },
  });
  return (
    <HipsCard
      hipsChange={hipsChange}
      hipsData={hipsData}
      currentHips={currentHips}
    />
  );
};

HipsCardLoader.displayName = "HipsCardLoader";

export default HipsCardLoader;
