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
import WizardInput from "../components/wizard-input";
import useMeQuery from "@/hooks/useMeQuery";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useNextWizardPath from "../hooks/use-next-wizard-path";

const OnePage: FC = () => {
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate();
  const navigate = useNavigate();
  const nextPath = useNextWizardPath();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: data.meta?.firstName,
    },
  });
  const handleSuccess = useCallback(() => {
    navigate(nextPath);
  }, [nextPath, navigate]);

  const handleSubmit = useCallback(
    (body: FormSchema) => {
      mutate(
        {
          headers: { "Content-type": "application/json" },
          body: {
            meta: {
              ...(data.meta || {}),
              ...body,
            },
          },
        },
        {
          onSuccess: handleSuccess,
        }
      );
    },
    [data.meta, handleSuccess, mutate]
  );

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <WizardInput
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
