import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { SpineIssuesFormSchema } from "../zod";
import { Textarea } from "@/components/ui/textarea";

const SpineIssuesStep: FC<{
  field: ControllerRenderProps<SpineIssuesFormSchema, "spineIssues">;
  pending?: boolean;
}> = ({ field, pending }) => {
  return (
    <FormItem>
      <FormControl>
        <div className="w-full sm:w-auto flex items-center">
          <Textarea
            autoFocus
            className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
            placeholder="Чи нема у вас діагностованого розладу харчової поведінки?"
            disabled={pending}
            {...field}
          />
        </div>
      </FormControl>
      <FormMessage className="px-3" />
    </FormItem>
  );
};

export default SpineIssuesStep;
