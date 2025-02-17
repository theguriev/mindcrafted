import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { LastNameFormSchema } from "../zod";
import WizardInput from "./wizard-input";

const LastNameStep: FC<{
  field: ControllerRenderProps<LastNameFormSchema, "lastName">;
  pending?: boolean;
}> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardInput
            placeholder="Введіть вашу фамілію"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default LastNameStep;
