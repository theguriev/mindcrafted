import { FC } from "react";
import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import HipCard from "./hip-card";
import selectBodyMeasurement from "../utils/selectBodyMeasurement";

const HipCardLoader: FC = () => {
  const {
    data: { change: hipChange, data: hipData, current: currentHip },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "hip", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: selectBodyMeasurement,
    },
  });
  return (
    <HipCard hipChange={hipChange} hipData={hipData} currentHip={currentHip} />
  );
};

HipCardLoader.displayName = "HipCardLoader";

export default HipCardLoader;
