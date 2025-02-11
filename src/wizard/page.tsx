import { FC } from "react";
import { useParams } from "react-router";
import steps from "./2";

const Wizard2Page: FC = () => {
  const { step } = useParams<{ step: string }>();
  const choosedStep = steps.find(
    (candidateStep) => candidateStep.name === step
  );
  const { form, handleSubmit } = useWizardStep({
    formSchema: choosedStep?.formSchema,
    onSubmit,
    prepareBody: (body) => body,
    getDefaultValues: (data) => ({
      sex: data.meta?.sex,
    }),
  });
  console.log("log: Wizard2Page.tsx: choosedStep:", choosedStep);
  return (
    <div>
      <h1>Wizard Step: {step}</h1>
      {/* Render the appropriate step component based on the step parameter */}
    </div>
  );
};

export default Wizard2Page;
