import { useState } from "react";
import { NutritionProgress } from "./components/nutrition-progress";
import { MealCard } from "./components/meal-card";
import type { Selection, Meal, IngredientInfo } from "./components/types";

const NutritionPage = () => {
  // У реальному додатку це буде надходити з вашого API/бази даних
  const mealCategories = [
    {
      id: "a",
      name: "Категорія A",
      description: "Злаки та крохмалі",
      items: [
        { name: "Бобові", recommendedGrams: 30 },
        { name: "Картопля", recommendedGrams: 100 },
        { name: "Свіжа кукурудза", recommendedGrams: 100 },
        { name: "Каші", recommendedGrams: 30 },
        { name: "Булгур", recommendedGrams: 30 },
        { name: "Пшениця", recommendedGrams: 30 },
        { name: "Рис (не шліфований)", recommendedGrams: 30 },
        { name: "Будь-яка крупа", recommendedGrams: 30 },
        { name: "Цільнозернове борошно", recommendedGrams: 30 },
        { name: "Хліб", recommendedGrams: 45 },
        { name: "Цільнозерновий хліб", recommendedGrams: 50 },
        { name: "Макарони", recommendedGrams: 30 },
        { name: "Піта", recommendedGrams: 45 },
      ],
    },
    {
      id: "b",
      name: "Категорія B",
      description: "Молочні продукти та жири",
      items: [
        {
          name: "Зернистий сир (знежирений сир) 0.2% жиру",
          recommendedGrams: 70,
        },
        { name: "М'які, тверді, плавлені сири", recommendedGrams: 17 },
        { name: "Сметана 15%", recommendedGrams: 30 },
        { name: "Вершкове масло", recommendedGrams: 7 },
        { name: "Сало", recommendedGrams: 6 },
        { name: "Кефір 1%", recommendedGrams: 135 },
        { name: "Солодкий йогурт 1% жиру", recommendedGrams: 125 },
        { name: "Молоко 1%", recommendedGrams: 140 },
      ],
    },
    {
      id: "c",
      name: "Категорія C",
      description: "Інші продукти",
      items: [
        { name: "Солодощі", recommendedGrams: 70 },
        { name: "Закуски", recommendedGrams: 70 },
        { name: "Ковбаса", recommendedGrams: 70 },
        { name: "Інші продукти", recommendedGrams: 70 },
      ],
    },
  ];

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Прийом їжі 1",
      selections: {
        a: { item: "Цільнозерновий хліб", grams: 50, portion: "whole" },
        b: { item: "Кефір 1%", grams: 135, portion: "whole" },
        c: { item: "Закуски", grams: 70, portion: "whole" },
      },
    },
    {
      id: 2,
      name: "Прийом їжі 2",
      selections: { a: null, b: null, c: null },
    },
    {
      id: 3,
      name: "Прийом їжі 3",
      selections: { a: null, b: null, c: null },
    },
    {
      id: 4,
      name: "Прийом їжі 4",
      selections: { a: null, b: null, c: null },
    },
  ]);

  const [openPopover, setOpenPopover] = useState<{ [key: string]: boolean }>(
    {}
  );

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
    item: IngredientInfo,
    portion: "whole" | "half" = "whole"
  ) => {
    const baseGrams = item.recommendedGrams;
    const newGrams =
      portion === "whole" ? baseGrams : Math.round(baseGrams * 0.5);

    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: {
                ...meal.selections,
                [category]: {
                  item: item.name,
                  grams: newGrams,
                  portion: portion,
                },
              },
            }
          : meal
      )
    );

    // Close the popover after selection
    setOpenPopover({
      ...openPopover,
      [`${mealId}-${category}`]: false,
    });
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

  const clearSelection = (mealId: number, category: "a" | "b" | "c") => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: {
                ...meal.selections,
                [category]: null,
              },
            }
          : meal
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <NutritionProgress
        completedMeals={completedMeals}
        totalMeals={totalMeals}
        progress={progress}
      />

      <div className="grid gap-4">
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            mealCategories={mealCategories}
            isMealComplete={isMealComplete(meal.selections)}
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
            onSelectItem={handleSelectItem}
            onClearSelection={clearSelection}
            onResetMeal={resetMealSelections}
          />
        ))}
      </div>
    </div>
  );
};

export default NutritionPage;
