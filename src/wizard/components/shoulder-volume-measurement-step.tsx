import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ShoulderVolumeMeasurementFormSchema } from "../zod";
import { Input } from "@/components/ui/input";

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
          <Input
            autoFocus
            className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
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
