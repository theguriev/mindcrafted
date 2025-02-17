import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

export type WizardStepProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  pending?: boolean;
};
