import { FC } from "react";
import { useMeasurementQuery } from "@/hooks/useMeasurementQuery";
import selectBodyMeasurement from "../utils/selectBodyMeasurement";
import { BodyMeasurement } from "../types";

const BodyMeasurementLoader: FC<{
  Component: FC<Partial<BodyMeasurement>>;
  type: string;
}> = ({ Component, type }) => {
  const {
    data: { change, data, current },
  } = useMeasurementQuery({
    fetchParams: {
      headers: { "Content-type": "application/json" },
      query: { type, limit: 100, offset: 0 },
    },
    queryOptions: {
      select: selectBodyMeasurement,
    },
  });
  return <Component change={change} data={data} current={current} />;
};

BodyMeasurementLoader.displayName = "BodyMeasurementLoader";

export default BodyMeasurementLoader;
