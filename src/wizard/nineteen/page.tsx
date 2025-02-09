import { Button } from "@/components/ui/button";
import { formSchema } from "./zod";
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
import WizardForm from "../components/wizard-form";
import WizardFormFooter from "../components/wizard-form-footer";
import useWizardStep from "../hooks/useWizardStep";
import { FC } from "react";

const NineteenPage: FC<{ to: string }> = ({ to }) => {
  const { form, handleSubmit, isPending } = useWizardStep({
    to,
    getDefaultValues: (data) => ({
      gaveBirth: data.meta?.gaveBirth
        ? new Date(Date.parse(data.meta.gaveBirth))
        : undefined,
    }),
    prepareBody: (body) => ({ gaveBirth: body.gaveBirth?.toISOString() }),
    formSchema,
  });

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name="gaveBirth"
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
                        <span>Якщо народжували то коли?</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value}
                      onSelect={(value) => field.onChange(value)}
                      fromYear={1990}
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

export default NineteenPage;
