import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { PhysicalActivityFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";

const PhysicalActivityStep: FC<{
  field: ControllerRenderProps<PhysicalActivityFormSchema, "physicalActivity">;
  pending?: boolean;
}> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardTextarea
            placeholder="Яка у вас рухова активність за останній рік, включно з тренуваннями і роботою?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default PhysicalActivityStep;
