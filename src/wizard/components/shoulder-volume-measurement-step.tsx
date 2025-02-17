import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ShoulderVolumeMeasurementFormSchema } from "../zod";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const ShoulderVolumeMeasurementStep: FC<
  WizardStepProps<
    ShoulderVolumeMeasurementFormSchema,
    "shoulderVolumeMeasurement"
  >
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardInput
            placeholder="Обхват плеча (см)"
            type="number"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default ShoulderVolumeMeasurementStep;
