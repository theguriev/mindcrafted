import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ContraindicationsFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";
import { WizardStepProps } from "../types";

const ContraindicationsStep: FC<
  WizardStepProps<ContraindicationsFormSchema, "contraindications">
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardTextarea
            placeholder="Чи є якість протипоказання до вправ від лікаря?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default ContraindicationsStep;
