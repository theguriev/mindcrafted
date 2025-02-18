import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import WizardInput from "./wizard-input";
import { WizardStepProps } from "../types";

const FirstNameStep: FC<WizardStepProps<FormSchema, "firstName">> = ({
  field,
  pending,
}) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          {JSON.stringify(field)}
          <WizardInput
            placeholder="Введіть ваше ім'я"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default FirstNameStep;
