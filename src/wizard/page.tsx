import { FC } from "react";
import { useParams } from "react-router";
import steps, { hasStep } from "./steps";
import { FormField } from "@/components/ui/form";
import WizardForm from "./components/wizard-form";
import WizardFormFooter from "./components/wizard-form-footer";
import { useForm } from "react-hook-form";
import { camelCase, kebabCase } from "scule";
import { useNavigate } from "react-router";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";
import { formSchema, FormSchema } from "./zod";
import useMeQuery from "@/hooks/useMeQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const Wizard2Page: FC = () => {
  const { step } = useParams<{ step: string }>();
  if (!step) {
    throw new Error("Step is required");
  }
  const camelStep = camelCase(step);
  if (!hasStep(camelStep)) {
    throw new Error(`Invalid step: ${camelStep}`);
  }
  const stepObject = steps.get(camelStep);
  if (!stepObject) {
    throw new Error(`Invalid step: ${step}`);
  }
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdateMetaMutate();
  const { data } = useMeQuery();

  const form = useForm<FormSchema>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      ...data.meta,
      birthday: data.meta?.birthday ? new Date(data.meta.birthday) : undefined,
      gaveBirth: data.meta?.gaveBirth
        ? new Date(data.meta.gaveBirth)
        : undefined,
    },
  });

  const handleSubmit = (body: FormSchema) => {
    console.log("log: body", body);

    mutate({
      headers: { "Content-type": "application/json" },
      body: {
        meta: {
          ...body,
          birthday: body.birthday ? body.birthday?.toISOString() : undefined,
          gaveBirth: body.gaveBirth ? body.gaveBirth?.toISOString() : undefined,
        },
      },
    });
    const routes = Array.from(steps.values());
    const routesList =
      body.sex === "male" ? routes.slice(0, routes.length - 2) : routes;
    const nextStep = routesList[stepObject.index + 1]?.name;
    if (!nextStep) {
      navigate("/");
    } else {
      navigate(`/wizard/${kebabCase(nextStep)}`);
    }
  };

  const Step = stepObject.control;

  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      {stepObject.name}
      <FormField
        control={form.control}
        name={stepObject.name}
        render={({ field }) => <Step field={field as never} />}
      />
      <WizardFormFooter valid={true} pending={isPending} />
    </WizardForm>
  );
};

export default Wizard2Page;
