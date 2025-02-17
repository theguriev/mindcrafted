import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { LastNameFormSchema } from "../zod";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const LastNameStep: FC<WizardStepProps<LastNameFormSchema, "lastName">> = ({
  field,
  pending,
}) => {
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
