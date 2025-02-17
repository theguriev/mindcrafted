import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { BreastVolumeMeasurementFormSchema } from "../zod";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const BreastVolumeMeasurementStep: FC<
  WizardStepProps<BreastVolumeMeasurementFormSchema, "breastVolumeMeasurement">
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardInput
            placeholder="Обхват грудей (см)"
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

export default BreastVolumeMeasurementStep;
