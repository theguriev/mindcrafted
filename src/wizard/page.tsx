import { FC, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import steps, { hasStep } from "./steps";
import useWizardStep from "./hooks/useWizardStep";
import { FormField } from "@/components/ui/form";
import WizardForm from "./components/wizard-form";
import WizardFormFooter from "./components/wizard-form-footer";
import { FieldValues } from "react-hook-form";
import { camelCase, kebabCase } from "scule";
import { useNavigate } from "react-router";
import useUpdateMetaMutate from "@/hooks/useUpdateMetaMutate";
import getDefaultValuesFn from "./utils/getDefaultValuesFn";
import getPrepareBodyFn from "./utils/getPrepareBodyFn";

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
  const getDefaultValues = useMemo(
    () => getDefaultValuesFn(stepObject),
    [stepObject]
  );
  const prepareBody = useMemo(() => getPrepareBodyFn(stepObject), [stepObject]);
  const onSubmit = useCallback(
    (body: { meta: FieldValues }) => {
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
    [mutate, navigate, stepObject.index]
  );
  const { form, handleSubmit } = useWizardStep({
    formSchema: stepObject?.formSchema,
    onSubmit,
    prepareBody,
    getDefaultValues,
  });
  const Control = useMemo(() => stepObject.control, [stepObject]);

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
