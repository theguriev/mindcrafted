import type React from "react";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategorySelector } from "./category-selector";
import { MealSummary } from "./meal-summary";
import type { CategoryInfo, Meal, IngredientInfo } from "./types";

interface MealCardProps {
  meal: Meal;
  mealCategories: CategoryInfo[];
  isMealComplete: boolean;
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

export function MealCard({
  meal,
  mealCategories,
  isMealComplete,
  openPopover,
  setOpenPopover,
  onSelectItem,
  onClearSelection,
  onResetMeal,
}: MealCardProps) {
  return (
    <Card className={isMealComplete ? "border-green-200" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{meal.name}</CardTitle>
          {isMealComplete && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Check className="h-3 w-3 mr-1" /> Завершено
            </Badge>
          )}
        </div>
        {isMealComplete && <MealSummary selections={meal.selections} />}
      </CardHeader>
      <CardContent>
        {!isMealComplete ? (
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
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onResetMeal(meal.id)}
          >
            Змінити вибір
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
