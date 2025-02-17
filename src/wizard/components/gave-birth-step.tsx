import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { GaveBirthFormSchema } from "../zod";
import { WizardStepProps } from "../types";
import WizardCalendar from "./wizard-calendar";

const GaveBirthStep: FC<WizardStepProps<GaveBirthFormSchema, "gaveBirth">> = ({
  field,
}) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full px-3 sm:w-auto flex items-center">
          <WizardCalendar
            value={field.value}
            fromYear={1990}
            onSelect={(value) => field.onChange(value)}
            placeholder="Якщо народжували то коли?"
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default GaveBirthStep;
