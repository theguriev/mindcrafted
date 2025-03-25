import { FormSchema, formSchema } from "./zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import { FC, useCallback } from "react";
import WizardTextarea from "../components/wizard-textarea";
import useMeQuery from "@/hooks/use-me-query";
import useUpdateMetaMutate from "@/hooks/use-update-meta-mutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useNextWizardPath from "../hooks/use-next-wizard-path";

const FourteenPage: FC = () => {
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate();
  const navigate = useNavigate();
  const nextPath = useNextWizardPath();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      endocrineDisorders: data.meta?.endocrineDisorders,
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
        name="endocrineDisorders"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <WizardTextarea
                  placeholder="Чи нема ендокринних розладів?"
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

export default FourteenPage;
