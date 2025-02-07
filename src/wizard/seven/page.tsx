import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import EnterHint from "../components/enter-hint";
import useWizardStep from "../hooks/useWizardStep";
import { formSchema } from "./zod";

const SevenPage = () => {
  const { form, handleSubmit, isPending } = useWizardStep({
    to: "/wizard/eight",
    getDefaultValues: (data) => ({
      shoulderVolumeMeasurement: data.meta?.shoulderVolumeMeasurement,
    }),
    prepareBody: (body) => body,
    formSchema,
  });

  return (
    <div className="min-h-screen flex items-center bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-full gap-4 sm:flex-row sm:items-start sm:justify-center"
        >
          <FormField
            control={form.control}
            name="shoulderVolumeMeasurement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full sm:w-auto flex items-center">
                    <Input
                      autoFocus
                      className="sm:w-80 w-full border-none shadow-none focus-visible:ring-0"
                      placeholder="Обхват плеча (см)"
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

export default SevenPage;
