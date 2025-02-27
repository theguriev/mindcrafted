import { Check, Plus } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

type Selection = {
  a: { item: string; grams: number } | null;
  b: { item: string; grams: number } | null;
  c: { item: string; grams: number } | null;
};

type Meal = {
  id: number;
  name: string;
  selections: Selection;
};

type IngredientInfo = {
  name: string;
  recommendedGrams: number;
};

const NutritionPage: FC = () => {
  // In a real app, this would come from your API/database
  const mealCategories = [
    {
      id: "a",
      name: "Category A",
      description: "Grains & Starches",
      items: [
        { name: "Legumes", recommendedGrams: 30 },
        { name: "Potatoes", recommendedGrams: 100 },
        { name: "Fresh corn", recommendedGrams: 100 },
        { name: "Cereal", recommendedGrams: 30 },
        { name: "Bulgur", recommendedGrams: 30 },
        { name: "Wheat", recommendedGrams: 30 },
        { name: "Rice (not ground)", recommendedGrams: 30 },
        { name: "Any cereal", recommendedGrams: 30 },
        { name: "Whole grain flour", recommendedGrams: 30 },
        { name: "Bread", recommendedGrams: 45 },
        { name: "Whole grain bread", recommendedGrams: 50 },
        { name: "Macaroni", recommendedGrams: 30 },
        { name: "Pita bread", recommendedGrams: 45 },
      ],
    },
    {
      id: "b",
      name: "Category B",
      description: "Dairy & Fats",
      items: [
        {
          name: "Grain cheese (fat-free cottage cheese) 0.2% fat",
          recommendedGrams: 70,
        },
        { name: "Soft, hard, processed cheeses", recommendedGrams: 17 },
        { name: "Sour cream 15%", recommendedGrams: 30 },
        { name: "Butter", recommendedGrams: 7 },
        { name: "Lard", recommendedGrams: 6 },
        { name: "Kefir 1%", recommendedGrams: 135 },
        { name: "Sweet yogurt 1% fat", recommendedGrams: 125 },
        { name: "Milk 1%", recommendedGrams: 140 },
      ],
    },
    {
      id: "c",
      name: "Category C",
      description: "Other Foods",
      items: [
        { name: "Sweets", recommendedGrams: 70 },
        { name: "Snacks", recommendedGrams: 70 },
        { name: "Sausage", recommendedGrams: 70 },
        { name: "Other foods", recommendedGrams: 70 },
      ],
    },
  ];

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Breakfast",
      selections: {
        a: { item: "Whole grain bread", grams: 50 },
        b: { item: "Kefir 1%", grams: 135 },
        c: { item: "Snacks", grams: 70 },
      },
    },
    {
      id: 2,
      name: "Lunch",
      selections: { a: null, b: null, c: null },
    },
    {
      id: 3,
      name: "Snack",
      selections: { a: null, b: null, c: null },
    },
    {
      id: 4,
      name: "Dinner",
      selections: { a: null, b: null, c: null },
    },
  ]);

  const [, setTempGrams] = useState<{ [key: string]: number }>({});

  const isMealComplete = (selections: Selection) => {
    return (
      selections.a !== null && selections.b !== null && selections.c !== null
    );
  };

  const completedMeals = meals.filter((meal) =>
    isMealComplete(meal.selections)
  ).length;
  const totalMeals = meals.length;
  const progress = (completedMeals / totalMeals) * 100;

  const handleSelectItem = (
    mealId: number,
    category: "a" | "b" | "c",
    item: IngredientInfo
  ) => {
    const tempKey = `${mealId}-${category}-${item.name}`;
    setTempGrams((prev) => ({ ...prev, [tempKey]: item.recommendedGrams }));

    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: {
                ...meal.selections,
                [category]: { item: item.name, grams: item.recommendedGrams },
              },
            }
          : meal
      )
    );
  };

  const handleUpdateGrams = (
    mealId: number,
    category: "a" | "b" | "c",
    item: string,
    grams: number
  ) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: {
                ...meal.selections,
                [category]: { item, grams },
              },
            }
          : meal
      )
    );
  };

  const resetMealSelections = (mealId: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: { a: null, b: null, c: null },
            }
          : meal
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Meal Progress</CardTitle>
          <CardDescription>Track your 4 meals per day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>
                Progress: {completedMeals}/{totalMeals} meals
              </span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {meals.map((meal) => (
          <Card
            key={meal.id}
            className={
              isMealComplete(meal.selections) ? "border-green-200" : ""
            }
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{meal.name}</CardTitle>
                {isMealComplete(meal.selections) && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <Check className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
              {isMealComplete(meal.selections) && (
                <CardDescription className="space-y-2 mt-2">
                  <div className="grid gap-1">
                    <div className="text-sm">
                      Category A:{" "}
                      <span className="font-medium">
                        {meal.selections.a?.item}
                      </span>{" "}
                      ({meal.selections.a?.grams}g)
                    </div>
                    <div className="text-sm">
                      Category B:{" "}
                      <span className="font-medium">
                        {meal.selections.b?.item}
                      </span>{" "}
                      ({meal.selections.b?.grams}g)
                    </div>
                    <div className="text-sm">
                      Category C:{" "}
                      <span className="font-medium">
                        {meal.selections.c?.item}
                      </span>{" "}
                      ({meal.selections.c?.grams}g)
                    </div>
                  </div>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {!isMealComplete(meal.selections) ? (
                <div className="space-y-4">
                  {mealCategories.map((category) => (
                    <div key={category.id}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">
                          Category {category.id.toUpperCase()} -{" "}
                          {category.description}
                        </h3>
                        {meal.selections[category.id] && (
                          <Badge variant="secondary">
                            Selected: {meal.selections[category.id]?.item} (
                            {meal.selections[category.id]?.grams}g)
                          </Badge>
                        )}
                      </div>
                      <div className="grid gap-2">
                        {category.items.map((item) => {
                          const isSelected =
                            meal.selections[category.id]?.item === item.name;

                          return (
                            <div
                              key={item.name}
                              className="flex items-center gap-2"
                            >
                              <Button
                                variant={isSelected ? "default" : "outline"}
                                className="justify-start h-auto py-2 px-3 text-left flex-1"
                                onClick={() =>
                                  handleSelectItem(
                                    meal.id,
                                    category.id as "a" | "b" | "c",
                                    item
                                  )
                                }
                              >
                                {isSelected ? (
                                  <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                                ) : (
                                  <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                                )}
                                <span>{item.name}</span>
                                <span className="ml-auto text-muted-foreground">
                                  (recommended: {item.recommendedGrams}g)
                                </span>
                              </Button>
                              {isSelected && (
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    value={
                                      meal.selections[category.id]?.grams || ""
                                    }
                                    onChange={(e) => {
                                      const value =
                                        Number.parseInt(e.target.value) || 0;
                                      handleUpdateGrams(
                                        meal.id,
                                        category.id as "a" | "b" | "c",
                                        item.name,
                                        value
                                      );
                                    }}
                                    className="w-24"
                                    min="0"
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    g
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {category.id !== "c" && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => resetMealSelections(meal.id)}
                >
                  Change Selections
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NutritionPage;
