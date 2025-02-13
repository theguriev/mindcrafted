import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { ContraindicationsFormSchema } from "../zod";
import { Textarea } from "@/components/ui/textarea";

const ContraindicationsStep: FC<{
  field: ControllerRenderProps<
    ContraindicationsFormSchema,
    "contraindications"
  >;
  pending?: boolean;
}> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <Textarea
            autoFocus
            className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
            placeholder="Чи є якість протипоказання до вправ від лікаря?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default ContraindicationsStep;
