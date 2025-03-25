import { Check, Plus, Utensils, Divide, Save, ChevronDown, ChevronUp } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type CategoryId = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m";

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
  isSaved: boolean;
};

type IngredientInfo = {
  name: string;
  recommendedGrams: number;
};

const categoryLabels = {
  a: 'Буква А',
  b: 'Буква Б',
  c: 'Буква В',
  d: 'Буква Г',
  e: 'Буква Д',
  f: 'Буква Е',
  g: 'Буква Є',
  h: 'Буква Ж',
  i: 'Буква З',
  j: 'Буква И',
  k: 'Буква І',
  l: 'Буква Ї',
  m: 'Буква Й'
};

// Функція для розрахунку суми порцій для категорії
const calculatePortionSum = (selections: { portion: "full" | "half" }[], categoryId?: string): number => {
  // Якщо немає виборів, повертаємо 0
  if (selections.length === 0) return 0;
  
  // Спеціальна обробка для категорії В (c)
  if (categoryId === 'c') {
    const portion = selections[0]?.portion;
    return portion === "full" ? 1 : 0.5;
  }
  
  // Для інших категорій - стандартний розрахунок
  return selections.reduce((sum, selection) => {
    return sum + (selection.portion === "full" ? 1 : 0.5);
  }, 0);
};

const NutritionPage: FC = () => {
  // У реальному додатку це буде надходити з вашого API/бази даних
  const mealCategories = [
    {
      id: "a",
      name: "Буква А",
      items: [
        { name: "Бобові", recommendedGrams: 50 },
        { name: "Картопля", recommendedGrams: 180 },
        { name: "Кукурудза свіжа", recommendedGrams: 180 },
        { name: "Пластівці", recommendedGrams: 50 },
        { name: "Булгур", recommendedGrams: 50 },
        { name: "Гречка", recommendedGrams: 50 },
        { name: "Рис (не шліфований)", recommendedGrams: 50 },
        { name: "Будь-яка крупа", recommendedGrams: 50 },
        { name: "Цільнозернове борошно", recommendedGrams: 50 },
        { name: "Хлібці", recommendedGrams: 80 },
        { name: "Цільнозерновий хліб", recommendedGrams: 85 },
        { name: "Макарони т.с.", recommendedGrams: 50 },
        { name: "Лаваш", recommendedGrams: 80 },
      ],
    },
    {
      id: "b",
      name: "Буква Б",
      items: [
        { name: "Сир зернистий (творог нежирний) 0.2% жиру", recommendedGrams: 150 },
        { name: "Сири м'які, тверді, плавлені", recommendedGrams: 30 },
        { name: "Сметана 15%", recommendedGrams: 60 },
        { name: "Масло", recommendedGrams: 15 },
        { name: "Сало", recommendedGrams: 10 },
        { name: "Кефір 1%", recommendedGrams: 270 },
        { name: "Несолодкий йогурт 1% жиру", recommendedGrams: 250 },
        { name: "Молоко 1%", recommendedGrams: 280 },
      ],
    },
    {
      id: "c",
      name: "Буква В",
      items: [
        { name: "Будь-чого (солодощі, снеки, ковбаса тощо)", recommendedGrams: 75 },
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
        c: [],
      },
      isSaved: false,
    },
    {
      id: 2,
      name: "Прийом їжі 2",
      selections: { a: [], b: [], c: [] },
      isSaved: false,
    },
    {
      id: 3,
      name: "Прийом їжі 3",
      selections: { a: [], b: [], c: [] },
      isSaved: false,
    },
    {
      id: 4,
      name: "Прийом їжі 4",
      selections: { a: [], b: [], c: [] },
      isSaved: false,
    },
  ]);

  const [expandedMeals, setExpandedMeals] = useState<number[]>([]);

  const toggleMealExpansion = (mealId: number) => {
    setExpandedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

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
    
    // Якщо продукт вже вибрано, дозволяємо вибір
    const isCurrentSelected = selection.some(item => item.item === itemName);
    if (isCurrentSelected) return true;
    
    // Якщо нічого не вибрано, можна вибрати будь-який продукт
    if (selection.length === 0) return true;

    // Дозволяємо вибір для "Букви В"
    if (categoryId === "c") return true;

    // Якщо вже є продукт з повною порцією, не можна вибрати інші продукти
    const hasFullPortion = selection.some(item => item.portion === "full");
    if (hasFullPortion) return false;

    return true;
  };

  const handleSelectItem = (
    mealId: number,
    categoryId: CategoryId,
    item: IngredientInfo,
    portion: "full" | "half" = "full"
  ) => {
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
          }
        } else {
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

  const handleSaveMeal = (mealId: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? { ...meal, isSaved: true }
          : meal
      )
    );
    toast.success("Прийом їжі збережено");
  };

  const resetMealSelections = (mealId: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: { a: [], b: [], c: [] },
              isSaved: false,
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
            className={cn(
              isMealComplete(meal.selections) ? "border-green-200" : "",
              meal.isSaved ? "border-blue-200" : ""
            )}
          >
            <CardHeader 
              className="pb-2 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleMealExpansion(meal.id)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {expandedMeals.includes(meal.id) ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                    <CardTitle className="text-lg">{meal.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {isMealComplete(meal.selections) && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        <Check className="h-3 w-3 mr-1" /> Завершено
                      </Badge>
                    )}
                    {meal.isSaved && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        <Save className="h-3 w-3 mr-1" /> Збережено
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mealCategories.map((category) => {
                    const categoryId = category.id as CategoryId;
                    const selections = meal.selections[categoryId];
                    const portionSum = calculatePortionSum(selections, categoryId);
                    const remainingPortion = 1 - portionSum;
                    
                    if (portionSum > 0) {
                      return (
                        <Badge 
                          key={category.id}
                          variant="outline" 
                          className={cn(
                            portionSum >= 1 
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          )}
                        >
                          Категорія {categoryLabels[categoryId]}: {(portionSum * 100).toFixed(0)}%
                          {selections.map((selection, index) => (
                            <span key={index} className="ml-1 text-xs">
                              {selection.item} ({selection.portion === "full" ? "100%" : "50%"})
                            </span>
                          ))}
                        </Badge>
                      );
                    } else {
                      return (
                        <Badge 
                          key={category.id}
                          variant="outline" 
                          className="bg-gray-50 text-gray-500 border-gray-200"
                        >
                          Категорія {categoryLabels[categoryId]}: не вибрано
                        </Badge>
                      );
                    }
                  })}
                </div>
              </div>
            </CardHeader>
            {expandedMeals.includes(meal.id) && (
              <CardContent>
                <div className="space-y-6 mb-4">
                  {mealCategories.map((category) => {
                    const categoryId = category.id as CategoryId;
                    const selections = meal.selections[categoryId];
                    const portionSum = calculatePortionSum(selections, categoryId);
                    const remainingPortion = 1 - portionSum;
                    
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            {categoryLabels[categoryId]}
                          </h3>
                          {remainingPortion > 0 && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                              Доступно: {(remainingPortion * 100).toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {category.items.map((item) => {
                            const { selected, portion } = isItemSelected(meal.id, categoryId, item.name);
                            const canSelect = canSelectItem(meal.id, categoryId, item.name);
                            
                            return (
                              <div
                                key={item.name}
                                className={cn(
                                  "relative flex flex-col border rounded-lg p-3 transition-all overflow-hidden",
                                  selected
                                    ? "border-green-500 shadow-sm"
                                    : canSelect
                                    ? "border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer"
                                    : "border-gray-200 opacity-50 cursor-not-allowed"
                                )}
                              >
                                {selected && (
                                  <div 
                                    className={cn(
                                      "absolute inset-0 bg-green-50 z-0",
                                      portion === "half" ? "w-1/2 right-auto border-r border-green-100" : ""
                                    )} 
                                  />
                                )}
                                <div className="relative z-10 flex flex-col items-center">
                                  <div className="text-center font-medium line-clamp-2 h-auto mb-2">
                                    {item.name}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant={selected && portion === "half" ? "default" : "outline"}
                                      className="flex items-center justify-center"
                                      disabled={!canSelectItem(meal.id, categoryId, item.name, "half")}
                                      onClick={() => handleSelectItem(meal.id, categoryId, item, "half")}
                                    >
                                      <span className="text-xs">половина порції</span>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant={selected && portion === "full" ? "default" : "outline"}
                                      className="flex items-center justify-center"
                                      disabled={!canSelectItem(meal.id, categoryId, item.name, "full")}
                                      onClick={() => handleSelectItem(meal.id, categoryId, item, "full")}
                                    >
                                      <span className="text-xs">ціла порція</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {!meal.isSaved && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleSaveMeal(meal.id)}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Зберегти
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NutritionPage;

