import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { formSchema, FormSchema } from "./zod";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import WizardInput from "../components/wizard-input";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostMeasurementMutate from "@/hooks/use-post-measurement-mutate";
import { useNavigate } from "react-router";
import useNextWizardPath from "../hooks/use-next-wizard-path";

const FourPage: FC = () => {
  const { mutate, isPending } = usePostMeasurementMutate();

  const navigate = useNavigate();
  const nextPath = useNextWizardPath();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });
  const handleSuccess = useCallback(() => {
    navigate(nextPath);
  }, [nextPath, navigate]);

  const handleSubmit = useCallback(
    (body: FormSchema) => {
      const height = Number(body.height);
      mutate(
        {
          body: { type: "height", meta: { value: height } },
          headers: { "Content-type": "application/json" },
        },
        {
          onSuccess: handleSuccess,
        }
      );
    },
    [handleSuccess, mutate]
  );

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <WizardInput
                  placeholder="Ваш зріст (см)"
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

export default FourPage;
