import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSchema, formSchema } from "./zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import EnterHint from "../components/enter-hint";
import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const NineteenPage = () => {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      gaveBirth: undefined,
    },
  });

  const handleSubmit = async (body: FormSchema) => {
    console.log("log: submit", body);
    navigate("/wizard/twenty");
  };

  const handleSkipClick = () => {
    navigate("/wizard/twenty");
  };

  return (
    <div className="min-h-screen flex items-center bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-full gap-4 sm:flex-row sm:items-start sm:justify-center"
        >
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
                          selected={field.value}
                          onSelect={(value) => field.onChange(value)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage className="px-3" />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 px-3 w-full sm:w-auto">
            <Button variant="secondary" onClick={handleSkipClick}>
              Пропустити
            </Button>
            <Button disabled={!form.formState.isValid}>Продовжуйте</Button>
            <EnterHint valid={form.formState.isValid} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NineteenPage;
