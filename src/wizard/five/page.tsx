import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import useMeQuery from "@/hooks/useMeQuery";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";

const FivePage = () => {
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate({
    queryOptions: {
      onSuccess: () => {
        navigate("/wizard/six");
      },
    },
  });
  const navigate = useNavigate();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      weight: data.meta?.weight,
    },
  });

  const handleSubmit = async (body: FormSchema) => {
    mutate({
      headers: { "Content-type": "application/json" },
      body: {
        meta: {
          ...(data.meta || {}),
          ...body,
        },
      },
    });
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
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full sm:w-auto flex items-center">
                    <Input
                      autoFocus
                      className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                      placeholder="Ваша вага (кг)"
                      type="number"
                      disabled={isPending}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="px-3" />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-1 px-3 w-full sm:w-auto">
            <Button disabled={!form.formState.isValid || isPending}>
              Продовжуйте
            </Button>
            <EnterHint valid={form.formState.isValid} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FivePage;
