import type React from "react";
import { CategorySelector } from "./category-selector";
import type { CategoryInfo, Meal, IngredientInfo } from "./types";

interface MealContentProps {
  meal: Meal;
  mealCategories: CategoryInfo[];
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
}

export function MealContent({
  meal,
  mealCategories,
  openPopover,
  setOpenPopover,
  onSelectItem,
  onClearSelection,
}: MealContentProps) {
  return (
    <div className="space-y-4">
      {mealCategories.map((category) => (
        <CategorySelector
          key={category.id}
          mealId={meal.id}
          category={category}
          selection={
            meal.selections[category.id as keyof typeof meal.selections]
          }
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          onSelectItem={onSelectItem}
          onClearSelection={onClearSelection}
        />
      ))}
    </div>
  );
}
