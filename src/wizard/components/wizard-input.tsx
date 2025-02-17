import { cn } from "@/lib/utils";
import { forwardRef, ComponentProps } from "react";

const WizardInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm sm:w-80 border-none shadow-none focus-visible:ring-0",
          className
        )}
        ref={ref}
        autoFocus
        {...props}
      />
    );
  }
);
WizardInput.displayName = "WizardInput";

export default WizardInput;
