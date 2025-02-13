import { FC } from "react";
import { useParams } from "react-router";
import steps, { hasStep, StepObject } from "./steps";
import useWizardStep from "./hooks/useWizardStep";
import { FormField } from "@/components/ui/form";
import WizardForm from "./components/wizard-form";
import WizardFormFooter from "./components/wizard-form-footer";
import { DefaultValues, FieldValues } from "react-hook-form";
import useMeQuery from "@/hooks/useMeQuery";
import { camelCase, kebabCase } from "scule";
import { useNavigate } from "react-router";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";

const getPrepareBodyFn = (
  stepObject: StepObject
): ((body: FieldValues) => Record<string, unknown>) => {
  if (
    !stepObject ||
    !("prepareBody" in stepObject) ||
    !stepObject.prepareBody
  ) {
    return (body: FieldValues) => body;
  }
  return stepObject.prepareBody;
};

const getDefaultValuesFn = (
  stepObject: StepObject
): ((
  data: ReturnType<typeof useMeQuery>["data"]
) => DefaultValues<FieldValues>) => {
  if (!stepObject?.name) {
    throw new Error("Step name is required");
  }
  if (
    !stepObject ||
    !("getDefaultValues" in stepObject) ||
    !stepObject.getDefaultValues
  ) {
    return (data: FieldValues) => ({
      [stepObject?.name]: data[stepObject?.name],
    });
  }
  return stepObject.getDefaultValues;
};

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
  const { form, handleSubmit } = useWizardStep({
    formSchema: stepObject?.formSchema,
    onSubmit: (body: { meta: FieldValues }) => {
      mutate({
        headers: { "Content-type": "application/json" },
        body,
      });
      const routes = Array.from(steps.values());
      const routesList =
        body.meta.sex === "male" ? routes.slice(0, routes.length - 2) : routes;
      const nextStep = routesList[stepObject.index + 1]?.name;
      if (!nextStep) {
        navigate("/");
      } else {
        navigate(`/wizard/${kebabCase(nextStep)}`);
      }
    },
    prepareBody: getPrepareBodyFn(stepObject),
    getDefaultValues: getDefaultValuesFn(stepObject),
  });
  const Control = stepObject.control;
  return (
    <WizardForm onSubmit={form.handleSubmit(handleSubmit)} {...form}>
      <FormField
        control={form.control}
        name={stepObject.name}
        render={({ field }) => (
          <Control field={field as never} pending={isPending} />
        )}
      />
      <WizardFormFooter valid={form.formState.isValid} pending={false} />
    </WizardForm>
  );
};

export default Wizard2Page;
