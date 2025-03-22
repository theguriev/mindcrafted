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
        a: { item: "Цільнозерновий хліб", grams: 50 },
        b: { item: "Кефір 1%", grams: 135 },
        c: { item: "Закуски", grams: 70 },
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
          <CardTitle>Прогрес щоденних прийомів їжі</CardTitle>
          <CardDescription>
            Відстежуйте свої 4 прийоми їжі на день
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>
                Прогрес: {completedMeals}/{totalMeals} прийомів їжі
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
                    <Check className="h-3 w-3 mr-1" /> Завершено
                  </Badge>
                )}
              </div>
              {isMealComplete(meal.selections) && (
                <CardDescription className="space-y-2 mt-2">
                  <div className="grid gap-1">
                    <div className="text-sm">
                      Категорія A:{" "}
                      <span className="font-medium">
                        {meal.selections.a?.item}
                      </span>{" "}
                      ({meal.selections.a?.grams}г)
                    </div>
                    <div className="text-sm">
                      Категорія B:{" "}
                      <span className="font-medium">
                        {meal.selections.b?.item}
                      </span>{" "}
                      ({meal.selections.b?.grams}г)
                    </div>
                    <div className="text-sm">
                      Категорія C:{" "}
                      <span className="font-medium">
                        {meal.selections.c?.item}
                      </span>{" "}
                      ({meal.selections.c?.grams}г)
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
                          Категорія {category.id.toUpperCase()} -{" "}
                          {category.description}
                        </h3>
                        {meal.selections[category.id] && (
                          <Badge variant="secondary">
                            Обрано: {meal.selections[category.id]?.item} (
                            {meal.selections[category.id]?.grams}г)
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
                                  (рекомендовано: {item.recommendedGrams}г)
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
                                    г
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
                  Змінити вибір
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
