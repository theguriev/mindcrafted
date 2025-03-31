import { CardDescription } from "@/components/ui/card";
import type { Selection } from "./types";

interface MealSummaryProps {
  selections: Selection;
}

export function MealSummary({ selections }: MealSummaryProps) {
  const getPortionText = (portion: "whole" | "half") => {
    return portion === "whole"
      ? "Повна порція (100%)"
      : "Половина порції (50%)";
  };

  return (
    <CardDescription className="space-y-2 mt-2">
      <div className="grid gap-1">
        <div className="text-sm">
          Категорія A: <span className="font-medium">{selections.a?.item}</span>{" "}
          ({selections.a?.grams}г -{" "}
          {getPortionText(selections.a?.portion || "whole")})
        </div>
        <div className="text-sm">
          Категорія B: <span className="font-medium">{selections.b?.item}</span>{" "}
          ({selections.b?.grams}г -{" "}
          {getPortionText(selections.b?.portion || "whole")})
        </div>
        <div className="text-sm">
          Категорія C: <span className="font-medium">{selections.c?.item}</span>{" "}
          ({selections.c?.grams}г -{" "}
          {getPortionText(selections.c?.portion || "whole")})
        </div>
      </div>
    </CardDescription>
  );
}
