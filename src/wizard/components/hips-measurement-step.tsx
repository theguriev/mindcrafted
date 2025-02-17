import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { HipsMeasurementFormSchema } from "../zod";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const HipsMeasurementStep: FC<
  WizardStepProps<HipsMeasurementFormSchema, "hipsMeasurement">
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardInput
            placeholder="Обхват стегон (см)"
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

export default HipsMeasurementStep;
