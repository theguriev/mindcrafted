import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { SexFormSchema } from "../zod";

const SexStep: FC<{
  field: ControllerRenderProps<SexFormSchema, "sex">;
}> = ({ field }) => {
  return (
    <FormItem className="sm:w-80 w-full px-3 sm:px-0">
      <FormLabel>Ваша стать?</FormLabel>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="r1" />
              <Label htmlFor="r1">Чоловік</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="r2" />
              <Label htmlFor="r2">Жінка</Label>
            </div>
          </RadioGroup>
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default SexStep;
