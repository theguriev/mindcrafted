import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FoodIntolerancesFormSchema } from "../zod";
import WizardTextarea from "./wizard-textarea";

const FoodIntoIerancesStep: FC<{
  field: ControllerRenderProps<FoodIntolerancesFormSchema, "foodIntolerances">;
  pending?: boolean;
}> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <WizardTextarea
            placeholder="Чи є у вас непереносимість певних продуктів?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default FoodIntoIerancesStep;
