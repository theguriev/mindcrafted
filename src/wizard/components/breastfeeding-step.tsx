import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { FC } from "react";
import { BreastfeedingFormSchema } from "../zod";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WizardStepProps } from "../types";

const BreastfeedingStep: FC<
  WizardStepProps<BreastfeedingFormSchema, "breastfeeding">
> = ({ field }) => {
  return (
    <FormItem className="sm:w-80 w-full px-3 sm:px-0">
      <FormLabel>Годуєте грудьми?</FormLabel>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="r1" />
              <Label htmlFor="r1">Так</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="r2" />
              <Label htmlFor="r2">Ні</Label>
            </div>
          </RadioGroup>
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default BreastfeedingStep;
