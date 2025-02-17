import { cn } from "@/lib/utils";
import { forwardRef, ComponentProps } from "react";

const WizardTextarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm sm:w-80 w-full border-none shadow-none focus-visible:ring-0",
        className
      )}
      autoFocus
      ref={ref}
      {...props}
    />
  );
});
WizardTextarea.displayName = "Textarea";

export default WizardTextarea;
