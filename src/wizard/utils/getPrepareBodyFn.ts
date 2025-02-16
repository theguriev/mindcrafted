import { FieldValues } from "react-hook-form";
import { StepObject } from "../steps";

const getPrepareBodyFn = (
  stepObject: StepObject
): ((body: FieldValues) => Record<string, unknown>) => {
  if (
    !stepObject ||
    !("prepareBody" in stepObject) ||
    !stepObject.prepareBody
  ) {
    return (body: FieldValues) => body;
  }
  return stepObject.prepareBody;
};

export default getPrepareBodyFn;
