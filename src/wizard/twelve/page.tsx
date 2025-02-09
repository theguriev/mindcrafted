import { formSchema } from "./zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import useWizardStep from "../hooks/useWizardStep";
import { FC } from "react";

const TwelvePage: FC<{ to: string }> = ({ to }) => {
  const { form, handleSubmit, isPending } = useWizardStep({
    to,
    getDefaultValues: (data) => ({
      eatingDisorder: data.meta?.eatingDisorder,
    }),
    prepareBody: (body) => body,
    formSchema,
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="eatingDisorder"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <Textarea
                  autoFocus
                  className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                  placeholder="Чи нема у вас діагностованого розладу харчової поведінки?"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="px-3" />
          </FormItem>
        )}
      />
      <WizardFormFooter valid={form.formState.isValid} pending={isPending} />
    </WizardForm>
  );
};

export default TwelvePage;
