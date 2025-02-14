import useMeQuery from "@/hooks/useMeQuery";
import { DefaultValues, FieldValues } from "react-hook-form";
import { StepObject } from "../steps";

const getDefaultValuesFn = (
  stepObject: StepObject
): ((
  data: ReturnType<typeof useMeQuery>["data"]
) => DefaultValues<FieldValues>) => {
  if (!stepObject?.name) {
    throw new Error("Step name is required");
  }
  if (
    !stepObject ||
    !("getDefaultValues" in stepObject) ||
    !stepObject.getDefaultValues
  ) {
    return (data: FieldValues) => ({
      [stepObject?.name]: data[stepObject?.name],
    });
  }
  return stepObject.getDefaultValues;
};

export default getDefaultValuesFn;
