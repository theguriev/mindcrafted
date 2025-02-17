import { FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { FC } from "react";
import { BirthdayFormSchema } from "../zod";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { WizardStepProps } from "../types";

const BirthdayStep: FC<WizardStepProps<BirthdayFormSchema, "birthday">> = ({
  field,
}) => {
  return (
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
  );
};

export default BirthdayStep;
