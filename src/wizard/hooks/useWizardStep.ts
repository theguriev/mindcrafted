import useMeQuery from "@/hooks/useMeQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const useWizardStep = <
  TFieldValues extends FieldValues = FieldValues,
  T extends z.Schema = z.Schema
>({
  getDefaultValues,
  prepareBody,
  formSchema,
  onSubmit,
}: {
  onSubmit: (body: { meta: FieldValues }) => void;
  getDefaultValues: (
    data: ReturnType<typeof useMeQuery>["data"]
  ) => DefaultValues<TFieldValues>;
  prepareBody: (body: TFieldValues) => Record<string, unknown>;
  formSchema: T;
}) => {
  const { data } = useMeQuery();

  const form = useForm<TFieldValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: getDefaultValues(data),
  });

  const handleSubmit = async (body: TFieldValues) => {
    onSubmit({
      meta: {
        ...(data.meta || {}),
        ...prepareBody(body),
      },
    });
    // form.setValue();
  };

  return { form, handleSubmit };
};

export default useWizardStep;
