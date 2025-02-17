import {
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { FC } from "react";
import { WhereDoSportsFormSchema } from "../zod";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WizardStepProps } from "../types";

const WhereDoSportsStep: FC<
  WizardStepProps<WhereDoSportsFormSchema, "whereDoSports">
> = ({ field }) => {
  return (
    <FormItem className="sm:w-80 w-full px-3 sm:px-0">
      <FormLabel>Де ви будете займатись?</FormLabel>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="home" id="r1" />
              <Label htmlFor="r1">Вдома</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gym" id="r2" />
              <Label htmlFor="r2">В залі</Label>
            </div>
          </RadioGroup>
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default WhereDoSportsStep;
