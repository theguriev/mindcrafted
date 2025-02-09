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
import { FC } from "react";
import { FieldValues } from "react-hook-form";
import useWizardStep from "../hooks/useWizardStep";

const FifteenPage: FC<{
  onSubmit: (body: { meta: FieldValues }) => void;
  pending: boolean;
}> = ({ onSubmit, pending }) => {
  const { form, handleSubmit } = useWizardStep({
    formSchema,
    onSubmit,
    prepareBody: (body) => body,
    getDefaultValues: (data) => ({
      physicalActivity: data.meta?.physicalActivity,
    }),
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="physicalActivity"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <Textarea
                  autoFocus
                  className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                  placeholder="Яка у вас рухова активність за останній рік, включно з тренуваннями і роботою?"
                  disabled={pending}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage className="px-3" />
          </FormItem>
        )}
      />
      <WizardFormFooter valid={form.formState.isValid} pending={pending} />
    </WizardForm>
  );
};

export default FifteenPage;
