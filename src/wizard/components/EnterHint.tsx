import { cn } from "@/lib/utils";
import { FC } from "react";

const EnterHint: FC<{ valid?: boolean }> = ({ valid }) => {
  return (
    <div
      className={cn(
        "flex gap-1 text-sm transition-opacity",
        valid ? "opacity-100" : "opacity-0"
      )}
    >
      нажміть <strong>Enter</strong>
    </div>
  );
};

export default EnterHint;
