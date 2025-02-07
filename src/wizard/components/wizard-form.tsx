import { FieldValues, FormProviderProps } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormEventHandler } from "react";

const WizardForm = <
  TFieldValues extends FieldValues,
  TContext,
  TTransformedValues extends FieldValues | undefined = undefined
>({
  onSubmit,
  ...props
}: FormProviderProps<TFieldValues, TContext, TTransformedValues> & {
  onSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  return (
    <div className="min-h-screen flex items-center bg-white">
      <Form {...props}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full gap-4 sm:flex-row sm:items-start sm:justify-center"
        >
          {props.children}
        </form>
      </Form>
    </div>
  );
};

export default WizardForm;
