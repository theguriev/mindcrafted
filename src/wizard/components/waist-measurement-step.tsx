import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { WaistMeasurementFormSchema } from "../zod";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const WaistMeasurementStep: FC<
  WizardStepProps<WaistMeasurementFormSchema, "waistMeasurement">
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardInput
            placeholder="Обхват талії (см)"
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

export default WaistMeasurementStep;
