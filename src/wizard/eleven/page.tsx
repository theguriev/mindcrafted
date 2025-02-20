import { formSchema } from "./zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import { FC } from "react";
import { FieldValues } from "react-hook-form";
import useWizardStep from "../hooks/useWizardStep";
import WizardTextarea from "../components/wizard-textarea";

const ElevenPage: FC<{
  onSubmit: (body: { meta: FieldValues }) => void;
  pending: boolean;
}> = ({ onSubmit, pending }) => {
  const { form, handleSubmit } = useWizardStep({
    formSchema,
    onSubmit,
    getDefaultValues: (data) => ({
      contraindications: data.meta?.contraindications,
    }),
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="contraindications"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <WizardTextarea
                  placeholder="Чи є якість протипоказання до вправ від лікаря?"
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

export default ElevenPage;
