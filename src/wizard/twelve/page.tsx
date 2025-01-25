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
import { Textarea } from "@/components/ui/textarea";

const TwelvePage = () => {
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      eatingDisorder: undefined,
    },
  });

  const handleSubmit = async (body: FormSchema) => {
    console.log("log: submit", body);
    navigate("/wizard/three");
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
            name="eatingDisorder"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full sm:w-auto flex items-center">
                    <Textarea
                      autoFocus
                      className="w-80 border-none shadow-none focus-visible:ring-0"
                      placeholder="Чи нема у вас діагностованого розладу харчової поведінки?"
                      {...field}
                    />
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

export default TwelvePage;
