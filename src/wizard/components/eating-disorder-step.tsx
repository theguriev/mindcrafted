import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { EatingDisorderFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";
import { WizardStepProps } from "../types";

const EatingDisorderStep: FC<
  WizardStepProps<EatingDisorderFormSchema, "eatingDisorder">
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardTextarea
            placeholder="Чи нема у вас діагностованого розладу харчової поведінки?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default EatingDisorderStep;
