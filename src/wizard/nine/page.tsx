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
import WizardInput from "../components/wizard-input";

const NinePage: FC<{
  onSubmit: (body: { meta: FieldValues }) => void;
  pending: boolean;
}> = ({ onSubmit, pending }) => {
  const { form, handleSubmit } = useWizardStep({
    formSchema,
    onSubmit,
    getDefaultValues: (data) => ({
      hipsMeasurement: data.meta?.hipsMeasurement,
    }),
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="hipsMeasurement"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <WizardInput
                  placeholder="Обхват стегон (см)"
                  type="number"
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

export default NinePage;
