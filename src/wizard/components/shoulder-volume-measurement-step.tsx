import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ShoulderVolumeMeasurementFormSchema } from "../zod";
import WizardInput from "./wizard-input";

const ShoulderVolumeMeasurementStep: FC<{
  field: ControllerRenderProps<
    ShoulderVolumeMeasurementFormSchema,
    "shoulderVolumeMeasurement"
  >;
  pending?: boolean;
}> = ({ field, pending }) => {
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
