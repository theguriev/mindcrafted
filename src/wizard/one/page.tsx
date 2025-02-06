import { formSchema, FormSchema } from "./zod";
import { useNavigate } from "react-router";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMeQuery from "@/hooks/useMeQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import EnterHint from "../components/enter-hint";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";

const OnePage = () => {
  const navigate = useNavigate();

  const { data } = useMeQuery();
  const { mutate } = useUpdateMetaMutate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: data.firstName,
    },
  });

  const handleSubmit = async (body: FormSchema) => {
    mutate({
      meta: {
        ...(data.meta || {}),
        ...body,
      },
    });
    console.log("log: submit", body);
    navigate("/wizard/two");
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full sm:w-auto flex items-center">
                    <Input
                      autoFocus
                      className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                      placeholder="Введіть ваше ім'я"
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

export default OnePage;
