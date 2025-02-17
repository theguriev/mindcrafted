import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { WeightFormSchema } from "../zod";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const WeightStep: FC<WizardStepProps<WeightFormSchema, "weight">> = ({
  field,
  pending,
}) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardInput
            placeholder="Ваша вага (кг)"
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

export default WeightStep;
