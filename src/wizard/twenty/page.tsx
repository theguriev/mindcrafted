import { FormSchema, formSchema } from "./zod";
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
import { FC, useCallback } from "react";
import useMeQuery from "@/hooks/use-me-query";
import useUpdateMetaMutate from "@/hooks/use-update-meta-mutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useNextWizardPath from "../hooks/use-next-wizard-path";

const TwentyPage: FC = () => {
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate();
  const navigate = useNavigate();
  const nextPath = useNextWizardPath();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      breastfeeding: data.meta?.breastfeeding,
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
        name="breastfeeding"
        render={({ field }) => (
          <FormItem className="sm:w-80 w-full px-3 sm:px-0">
            <FormLabel>Годуєте грудьми?</FormLabel>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="r1" />
                    <Label htmlFor="r1">Так</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="r2" />
                    <Label htmlFor="r2">Ні</Label>
                  </div>
                </RadioGroup>
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

export default TwentyPage;
