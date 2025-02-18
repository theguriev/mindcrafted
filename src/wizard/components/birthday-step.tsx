import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { WizardStepProps } from "../types";
import WizardCalendar from "./wizard-calendar";
import { FormSchema } from "../zod";

const BirthdayStep: FC<WizardStepProps<FormSchema, "birthday">> = ({
  field,
}) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full px-3 sm:w-auto flex items-center">
          {JSON.stringify(field)}
          <WizardCalendar
            value={field.value}
            fromYear={1950}
            onSelect={(value) => field.onChange(value)}
            placeholder="День вашого народження"
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default BirthdayStep;
