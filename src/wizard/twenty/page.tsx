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
  FormLabel,
} from "@/components/ui/form";
import EnterHint from "../components/enter-hint";
import { useNavigate } from "react-router";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TwentyPage = () => {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      breastfeeding: "yes",
    },
  });

  const handleSubmit = async (body: FormSchema) => {
    console.log("log: submit", body);
    navigate("/wizard/nineteen");
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
          <div className="flex flex-col gap-1 px-3 w-full sm:w-auto">
            <Button disabled={!form.formState.isValid}>Продовжуйте</Button>
            <EnterHint valid={form.formState.isValid} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TwentyPage;
