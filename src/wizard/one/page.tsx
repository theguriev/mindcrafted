import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useWizardStep from "../hooks/useWizardStep";
import { formSchema } from "./zod";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import { FC } from "react";

const OnePage: FC<{ to: string }> = ({ to }) => {
  const { form, handleSubmit, isPending } = useWizardStep({
    to,
    getDefaultValues: (data) => ({ firstName: data.meta?.firstName }),
    prepareBody: (body) => body,
    formSchema,
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <Input
                  autoFocus
                  className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                  placeholder="Введіть ваше ім'я"
                  disabled={isPending}
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

export default OnePage;
