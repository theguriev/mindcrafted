import { FC } from "react";
import { Button } from "@/components/ui/button";
import EnterHint from "./enter-hint";

const WizardFormFooter: FC<{ valid: boolean; pending: boolean }> = ({
  valid,
  pending,
}) => {
  return (
    <div className="flex flex-col gap-1 px-3 w-full sm:w-auto">
      <Button disabled={!valid || pending}>Продовжуйте</Button>
      <EnterHint valid={valid} />
    </div>
  );
};

export default WizardFormFooter;
