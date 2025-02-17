import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { GoalFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";
import { WizardStepProps } from "../types";

const GoalStep: FC<WizardStepProps<GoalFormSchema, "goal">> = ({
  field,
  pending,
}) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardTextarea
            placeholder="Яка ваша ціль?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default GoalStep;
