import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FormSchema, formSchema } from "./zod";
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import useMeQuery from "@/hooks/useMeQuery";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import useNextWizardPath from "../hooks/use-next-wizard-path";

const ThreePage: FC = () => {
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate();
  const navigate = useNavigate();
  const nextPath = useNextWizardPath();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      birthday: data.meta?.birthday
        ? new Date(Date.parse(data.meta.birthday))
        : undefined,
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
              ...{ birthday: body.birthday?.toISOString() },
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
        name="birthday"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="w-full px-3 sm:w-auto flex items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full sm:w-80 justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>День вашого народження</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value}
                      onSelect={(value) => field.onChange(value)}
                      fromYear={1950}
                      toYear={new Date().getFullYear()}
                      defaultMonth={field.value}
                    />
                  </PopoverContent>
                </Popover>
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

export default ThreePage;
