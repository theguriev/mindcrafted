import { FC } from "react";
import { useParams } from "react-router";
import steps, { hasStep, StepObject } from "./steps";
import useWizardStep from "./hooks/useWizardStep";
import { FormField } from "@/components/ui/form";
import WizardForm from "./components/wizard-form";
import WizardFormFooter from "./components/wizard-form-footer";
import { DefaultValues, FieldValues } from "react-hook-form";
import useMeQuery from "@/hooks/useMeQuery";

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
  if (!step || !hasStep(step)) {
    throw new Error(`Invalid step: ${step}`);
  }
  const stepObject = steps.get(step);
  if (!stepObject) {
    throw new Error(`Invalid step: ${step}`);
  }
  const { form, handleSubmit } = useWizardStep({
    formSchema: stepObject?.formSchema,
    onSubmit: (data) => {
      console.log("log: Wizard2Page.tsx: data:", data);
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
        render={({ field }) => <Control field={field as never} />}
      />
      <WizardFormFooter valid={form.formState.isValid} pending={false} />
    </WizardForm>
  );
};

export default Wizard2Page;
