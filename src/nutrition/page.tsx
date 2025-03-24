import { Check, Plus, Utensils, Divide } from "lucide-react";
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
import { cn } from "@/lib/utils";

type CategoryId = "a" | "b" | "c";

type Selection = {
  a: { item: string; portion: "full" | "half"; grams: number }[];
  b: { item: string; portion: "full" | "half"; grams: number }[];
  c: { item: string; portion: "full" | "half"; grams: number }[];
  [key: string]: { item: string; portion: "full" | "half"; grams: number }[];
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

// Функція для розрахунку суми порцій для категорії
const calculatePortionSum = (selections: { portion: "full" | "half" }[]): number => {
  return selections.reduce((sum, selection) => {
    return sum + (selection.portion === "full" ? 1 : 0.5);
  }, 0);
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
        a: [{ item: "Цільнозерновий хліб", portion: "full", grams: 50 }],
        b: [{ item: "Кефір 1%", portion: "full", grams: 135 }],
        c: [{ item: "Закуски", portion: "full", grams: 70 }],
      },
    },
    {
      id: 2,
      name: "Прийом їжі 2",
      selections: { a: [], b: [], c: [] },
    },
    {
      id: 3,
      name: "Прийом їжі 3",
      selections: { a: [], b: [], c: [] },
    },
    {
      id: 4,
      name: "Прийом їжі 4",
      selections: { a: [], b: [], c: [] },
    },
  ]);

  const isMealComplete = (selections: Selection) => {
    return (
      selections.a.length > 0 && 
      selections.b.length > 0 && 
      selections.c.length > 0
    );
  };

  const completedMeals = meals.filter((meal) =>
    isMealComplete(meal.selections)
  ).length;
  const totalMeals = meals.length;
  const progress = (completedMeals / totalMeals) * 100;

  // Функція для перевірки чи продукт вибраний
  const isItemSelected = (
    mealId: number, 
    categoryId: CategoryId, 
    itemName: string
  ): { selected: boolean; portion: "full" | "half" | null } => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return { selected: false, portion: null };
    
    const selection = meal.selections[categoryId];
    const foundItem = selection.find(item => item.item === itemName);
    
    if (foundItem) {
      return { selected: true, portion: foundItem.portion };
    }
    
    return { selected: false, portion: null };
  };

  // Функція для перевірки, чи можна вибрати продукт
  const canSelectItem = (
    mealId: number,
    categoryId: CategoryId,
    itemName: string,
    portion: "full" | "half" = "full"
  ): boolean => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return false;
    
    const selection = meal.selections[categoryId];
    
    // Якщо поточний продукт вже вибраний, його можна вибрати знову (для зміни розміру порції або видалення)
    const isCurrentSelected = selection.some(item => item.item === itemName);
    if (isCurrentSelected) return true;
    
    // Якщо нічого не вибрано, можна вибрати будь-який продукт
    if (selection.length === 0) return true;
    
    // Якщо вже є продукт з повною порцією, не можна вибрати інші продукти
    const hasFullPortion = selection.some(item => item.portion === "full");
    if (hasFullPortion) return false;
    
    // Якщо вже вибрано принаймні одну половинну порцію і спробуємо вибрати повну порцію нового продукту
    if (selection.length > 0 && portion === "full") return false;
    
    // Якщо вже вибрано дві половинні порції, не можна вибрати більше продуктів
    const portionSum = calculatePortionSum(selection);
    return portion === "half" ? portionSum < 1 : true;
  };

  const handleSelectItem = (
    mealId: number,
    categoryId: CategoryId,
    item: IngredientInfo,
    portion: "full" | "half" = "full"
  ) => {
    // Розрахунок грамів в залежності від обраної порції
    const grams = portion === "full" 
      ? item.recommendedGrams 
      : Math.round(item.recommendedGrams / 2);

    setMeals(
      meals.map((meal) => {
        if (meal.id !== mealId) return meal;
        
        const selection = [...meal.selections[categoryId]];
        const existingItemIndex = selection.findIndex(s => s.item === item.name);
        
        // Якщо продукт вже вибраний, оновлюємо його порцію
        if (existingItemIndex !== -1) {
          // Якщо порція така сама, як вже вибрана, видаляємо продукт
          if (selection[existingItemIndex].portion === portion) {
            selection.splice(existingItemIndex, 1);
          } else {
            // Інакше змінюємо розмір порції
            selection[existingItemIndex] = { 
              item: item.name, 
              portion, 
              grams 
            };
            
            // Якщо змінюємо на повну порцію, видаляємо всі інші вибрані продукти
            if (portion === "full") {
              selection.splice(0, existingItemIndex);
              selection.splice(1);
            }
          }
        } else {
          // Якщо вибираємо повну порцію, видаляємо всі інші вибрані продукти
          if (portion === "full") {
            selection.length = 0;
          } else {
            // Якщо вибираємо половину порції, перевіряємо чи не буде перевищено ліміт
            const currentPortionSum = calculatePortionSum(selection);
            if (currentPortionSum + 0.5 > 1) {
              // Якщо буде перевищено, видаляємо найстаріший вибір
              selection.shift();
            }
          }
          
          // Додаємо новий продукт
          selection.push({ 
            item: item.name, 
            portion, 
            grams 
          });
        }
        
        return {
          ...meal,
          selections: {
            ...meal.selections,
            [categoryId]: selection,
          },
        };
      })
    );
  };

  const resetMealSelections = (mealId: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: { a: [], b: [], c: [] },
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
                    {meal.selections.a.map((selection, index) => (
                      <div key={`a-${index}`} className="text-sm">
                        Категорія A:{" "}
                        <span className="font-medium">
                          {selection.item}
                        </span>{" "}
                        ({selection.grams}г, 
                        {selection.portion === "full" 
                          ? " повна порція" 
                          : " половина порції"})
                      </div>
                    ))}
                    {meal.selections.b.map((selection, index) => (
                      <div key={`b-${index}`} className="text-sm">
                        Категорія B:{" "}
                        <span className="font-medium">
                          {selection.item}
                        </span>{" "}
                        ({selection.grams}г, 
                        {selection.portion === "full" 
                          ? " повна порція" 
                          : " половина порції"})
                      </div>
                    ))}
                    {meal.selections.c.map((selection, index) => (
                      <div key={`c-${index}`} className="text-sm">
                        Категорія C:{" "}
                        <span className="font-medium">
                          {selection.item}
                        </span>{" "}
                        ({selection.grams}г, 
                        {selection.portion === "full" 
                          ? " повна порція" 
                          : " половина порції"})
                      </div>
                    ))}
                  </div>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {!isMealComplete(meal.selections) ? (
                <div className="space-y-4">
                  {mealCategories.map((category) => {
                    const categoryId = category.id as CategoryId;
                    const portionSum = calculatePortionSum(meal.selections[categoryId]);
                    const hasFullPortion = meal.selections[categoryId].some(item => item.portion === "full");
                    
                    return (
                      <div key={category.id}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            Категорія {category.id.toUpperCase()} -{" "}
                            {category.description}
                          </h3>
                          <div className="flex flex-wrap justify-end gap-2">
                            {meal.selections[categoryId].map((selection, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center">
                                {selection.item} 
                                <span className="ml-1 px-1 py-0.5 bg-green-100 text-green-800 rounded-sm text-xs">
                                  {selection.portion === "full" ? "100%" : "50%"}
                                </span>
                              </Badge>
                            ))}
                            {portionSum > 0 && (
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "bg-gray-50 text-gray-700",
                                  portionSum >= 1 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                                )}
                              >
                                {portionSum >= 1 
                                  ? "Заповнено: 100%" 
                                  : `Заповнено: ${portionSum * 100}%`
                                }
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {category.items.map((item) => {
                            const { selected, portion } = isItemSelected(meal.id, categoryId, item.name);
                            const canSelect = canSelectItem(meal.id, categoryId, item.name, selected ? portion || "full" : "full");
                            
                            return (
                              <div
                                key={item.name}
                                className={cn(
                                  "relative flex flex-col border rounded-lg p-3 transition-all overflow-hidden",
                                  selected
                                    ? "border-green-500 shadow-sm"
                                    : canSelect
                                    ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    : "border-gray-200 opacity-50 cursor-not-allowed"
                                )}
                              >
                                {/* Фон для відображення вибраного продукту */}
                                {selected && (
                                  <div 
                                    className={cn(
                                      "absolute inset-0 bg-green-50 z-0",
                                      portion === "half" ? "w-1/2 right-auto border-r border-green-100" : ""
                                    )} 
                                  />
                                )}
                                
                                {/* Контент продукту */}
                                <div className="relative z-10 flex flex-col items-center mb-2">
                                  <div className="text-center font-medium line-clamp-2 h-10">
                                    {item.name}
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <div className="text-xs text-muted-foreground">
                                      {item.recommendedGrams}г
                                    </div>
                                    {selected && (
                                      <div className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                                        {portion === "full" ? "100%" : "50%"}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Кнопки вибору порції */}
                                {selected ? (
                                  <div className="relative z-10 grid grid-cols-2 gap-2 mt-2">
                                    <Button
                                      size="sm"
                                      variant={portion === "half" ? "default" : "outline"}
                                      className="flex items-center justify-center"
                                      onClick={() =>
                                        handleSelectItem(
                                          meal.id,
                                          categoryId,
                                          item,
                                          "half"
                                        )
                                      }
                                    >
                                      <Divide className="h-4 w-4 mr-1" />
                                      <span className="text-xs">1/2</span>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant={portion === "full" ? "default" : "outline"}
                                      className="flex items-center justify-center"
                                      disabled={!canSelectItem(meal.id, categoryId, item.name, "full")}
                                      onClick={() =>
                                        handleSelectItem(
                                          meal.id,
                                          categoryId,
                                          item,
                                          "full"
                                        )
                                      }
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      <span className="text-xs">Повна</span>
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="relative z-10 grid grid-cols-2 gap-2 mt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="col-span-1"
                                      disabled={!canSelectItem(meal.id, categoryId, item.name, "half")}
                                      onClick={() =>
                                        handleSelectItem(
                                          meal.id,
                                          categoryId,
                                          item,
                                          "half"
                                        )
                                      }
                                    >
                                      <Divide className="h-4 w-4 mr-1" />
                                      <span className="text-xs">1/2</span>
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="col-span-1"
                                      disabled={!canSelectItem(meal.id, categoryId, item.name, "full")}
                                      onClick={() =>
                                        handleSelectItem(
                                          meal.id,
                                          categoryId,
                                          item,
                                          "full"
                                        )
                                      }
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      <span className="text-xs">Повна</span>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {category.id !== "c" && <Separator className="my-4" />}
                      </div>
                    );
                  })}
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

