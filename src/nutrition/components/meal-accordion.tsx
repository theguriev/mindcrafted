import type React from "react";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MealContent } from "./meal-content";
import type { CategoryInfo, Meal, IngredientInfo, Selection } from "./types";

interface MealAccordionProps {
  meals: Meal[];
  mealCategories: CategoryInfo[];
  isMealComplete: (selections: Selection) => boolean;
  openPopover: { [key: string]: boolean };
  setOpenPopover: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  onSelectItem: (
    mealId: number,
    category: "a" | "b" | "c",
    item: IngredientInfo,
    portion: "whole" | "half"
  ) => void;
  onClearSelection: (mealId: number, category: "a" | "b" | "c") => void;
  onResetMeal: (mealId: number) => void;
}

export function MealAccordion({
  meals,
  mealCategories,
  isMealComplete,
  openPopover,
  setOpenPopover,
  onSelectItem,
  onClearSelection,
}: MealAccordionProps) {
  // Default to first meal open, others closed
  const defaultValue = `meal-${meals[0].id}`;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="w-full"
    >
      {meals.map((meal) => {
        const complete = isMealComplete(meal.selections);
        return (
          <AccordionItem
            key={meal.id}
            value={`meal-${meal.id}`}
            className={`mb-4 border rounded-lg ${
              complete ? "border-green-200" : "border-border"
            }`}
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{meal.name}</span>
                {complete && (
                  <Badge
                    variant="outline"
                    className="ml-2 bg-green-50 text-green-700 border-green-200"
                  >
                    <Check className="h-3 w-3 mr-1" /> Завершено
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <MealContent
                meal={meal}
                mealCategories={mealCategories}
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
                onSelectItem={onSelectItem}
                onClearSelection={onClearSelection}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
