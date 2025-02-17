import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { EndocrineDisordersFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";
import { WizardStepProps } from "../types";

const EndocrineDisordersStep: FC<
  WizardStepProps<EndocrineDisordersFormSchema, "endocrineDisorders">
> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardTextarea
            placeholder="Чи нема ендокринних розладів?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default EndocrineDisordersStep;
