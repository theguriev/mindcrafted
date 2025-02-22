import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { forwardRef, ElementRef, ComponentProps } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

const BackTrigger = forwardRef<
  ElementRef<typeof Button>,
  ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const navigate = useNavigate();
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        navigate(-1);
      }}
      {...props}
    >
      <ChevronLeft />
      <span className="sr-only">Go back</span>
    </Button>
  );
});
BackTrigger.displayName = "BackTrigger";

export default BackTrigger;
