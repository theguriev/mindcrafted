import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import useWizardStep from "../hooks/useWizardStep";
import { formSchema } from "./zod";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";

const FivePage = () => {
  const { form, handleSubmit, isPending } = useWizardStep({
    to: "/wizard/six",
    getDefaultValues: (data) => ({
      weight: data.meta?.weight,
    }),
    prepareBody: (body) => body,
    formSchema,
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <Input
                  autoFocus
                  className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                  placeholder="Ваша вага (кг)"
                  type="number"
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

export default FivePage;
