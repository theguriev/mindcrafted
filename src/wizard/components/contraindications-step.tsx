import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ContraindicationsFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";

const ContraindicationsStep: FC<{
  field: ControllerRenderProps<
    ContraindicationsFormSchema,
    "contraindications"
  >;
  pending?: boolean;
}> = ({ field, pending }) => {
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
