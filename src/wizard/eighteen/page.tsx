import { formSchema } from "./zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import { FC } from "react";
import { FieldValues } from "react-hook-form";
import useWizardStep from "../hooks/useWizardStep";

const EighteenPage: FC<{
  onSubmit: (body: { meta: FieldValues }) => void;
  pending: boolean;
}> = ({ onSubmit, pending }) => {
  const { form, handleSubmit } = useWizardStep({
    formSchema,
    onSubmit,
    prepareBody: (body) => body,
    getDefaultValues: (data) => ({
      whereDoSports: data.meta?.whereDoSports,
    }),
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="whereDoSports"
        render={({ field }) => (
          <FormItem className="sm:w-80 w-full px-3 sm:px-0">
            <FormLabel>Де ви будете займатись?</FormLabel>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="r1" />
                    <Label htmlFor="r1">Вдома</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gym" id="r2" />
                    <Label htmlFor="r2">В залі</Label>
                  </div>
                </RadioGroup>
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

export default EighteenPage;
