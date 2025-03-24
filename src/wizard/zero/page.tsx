import { formSchema, FormSchema } from "./zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMeQuery from "@/hooks/useMeQuery";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";
import { useNavigate } from "react-router";
import useNextWizardPath from "../hooks/use-next-wizard-path";

const ZeroPage: FC = () => {
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate();
  const navigate = useNavigate();
  const nextPath = useNextWizardPath();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      sex: data.meta?.sex,
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
        name="sex"
        render={({ field }) => (
          <FormItem className="sm:w-80 w-full px-3 sm:px-0">
            <FormLabel>Ваша стать?</FormLabel>
            <FormControl>
              <div className="w-full sm:w-auto flex items-center">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="r1" />
                    <Label htmlFor="r1">Чоловік</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="r2" />
                    <Label htmlFor="r2">Жінка</Label>
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

export default ZeroPage;
