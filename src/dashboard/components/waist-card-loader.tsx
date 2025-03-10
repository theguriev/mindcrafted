import { FC } from "react";
import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import selectBodyMeasurement from "../utils/selectBodyMeasurement";
import WaistCard from "./waist-card";

const WaistCardLoader: FC = () => {
  const {
    data: { change, data, current },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type: "waist", limit: 100, offset: 0 },
    },
    queryOptions: {
      select: selectBodyMeasurement,
    },
  });
  return <WaistCard change={change} data={data} current={current} />;
};

WaistCardLoader.displayName = "WaistCardLoader";

export default WaistCardLoader;
