import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FC } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

const WizardCalendar: FC<{
  value?: Date;
  onSelect?: SelectSingleEventHandler;
  fromYear?: number;
  toYear?: number;
  placeholder: string;
}> = ({
  value,
  onSelect,
  fromYear,
  placeholder,
  toYear = new Date().getFullYear(),
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full sm:w-80 justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={value}
          onSelect={onSelect}
          fromYear={fromYear}
          toYear={toYear}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
};

WizardCalendar.displayName = "WizardCalendar";

export default WizardCalendar;
