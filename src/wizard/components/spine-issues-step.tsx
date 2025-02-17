import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { SpineIssuesFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";

const SpineIssuesStep: FC<{
  field: ControllerRenderProps<SpineIssuesFormSchema, "spineIssues">;
  pending?: boolean;
}> = ({ field, pending }) => {
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

export default SpineIssuesStep;
