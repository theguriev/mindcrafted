import useMeQuery from "@/hooks/useMeQuery";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const useWizardStep = <
  TFieldValues extends FieldValues = FieldValues,
  T extends z.Schema = z.Schema
>({
  to,
  getDefaultValues,
  prepareBody,
  formSchema,
}: {
  to: string;
  getDefaultValues: (
    data: ReturnType<typeof useMeQuery>["data"]
  ) => DefaultValues<TFieldValues>;
  prepareBody: (body: TFieldValues) => Record<string, unknown>;
  formSchema: T;
}) => {
  const navigate = useNavigate();
  const { data } = useMeQuery();
  const { mutate, isPending } = useUpdateMetaMutate({
    queryOptions: {
      onSuccess: () => {
        navigate(to);
      },
    },
  });

  const form = useForm<TFieldValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: getDefaultValues(data),
  });

  const handleSubmit = async (body: TFieldValues) => {
    mutate({
      headers: { "Content-type": "application/json" },
      body: {
        meta: {
          ...(data.meta || {}),
          ...prepareBody(body),
        },
      },
    });
  };

  return { form, handleSubmit, isPending };
};

export default useWizardStep;
