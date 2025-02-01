import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "path";
import { FC } from "react";
import { Button } from "react-day-picker";

const CustomDatePicker: FC = () => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-full sm:w-80 justify-start text-left font-normal relative",
        !field.value && "text-muted-foreground"
      )}
    >
      <Input
        autoFocus
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
        type="date"
        {...field}
      />
      <CalendarIcon />
      {field.value ? (
        format(field.value, "PPP")
      ) : (
        <span>День вашого народження</span>
      )}
    </Button>
  );
};
