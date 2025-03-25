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
  item: string;
  portion: "full" | "half";
  grams: number;
};

type Selections = {
  [key in CategoryId]?: Selection[];
};

type Meal = {
  id: number;
  name: string;
  selections: Selections;
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
const calculatePortionSum = (selections: { portion: "full" | "half" }[] = [], categoryId?: string): number => {
  // Якщо немає виборів, повертаємо 0
  if (!selections || selections.length === 0) return 0;
  
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
    // Категорії для прийому їжі 1
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
        { name: "Будь-що (солодощі, снеки, ковбаса тощо)", recommendedGrams: 75 },
      ],
    },
    // Категорії для прийому їжі 2
    {
      id: "d",
      name: "Буква Г",
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
      id: "e",
      name: "Буква Д",
      items: [
        { name: "Телятина", recommendedGrams: 160 },
        { name: "Печінка", recommendedGrams: 160 },
        { name: "Куряче або індиче філе", recommendedGrams: 190 },
        { name: "Риба (до 5% жиру)", recommendedGrams: 185 },
        { name: "Риба (від 5% жиру)", recommendedGrams: 125 },
        { name: "3 яйця", recommendedGrams: 150 },
        { name: "Морепродукти", recommendedGrams: 220 },
      ],
    },
    {
      id: "f",
      name: "Буква Е",
      items: [
        { name: "Овочі (свіжі)", recommendedGrams: 300 },
        { name: "Овочі (квашені)", recommendedGrams: 300 },
        { name: "Зелень", recommendedGrams: 300 },
        { name: "Гриби", recommendedGrams: 300 },
      ],
    },
    {
      id: "g",
      name: "Буква Є",
      items: [
        { name: "Будь-яка олія (рекомендуємо лляну)", recommendedGrams: 12 },
        { name: "Авокадо", recommendedGrams: 65 },
        { name: "Оливки", recommendedGrams: 80 },
        { name: "Гірчиця", recommendedGrams: 28 },
        { name: "Майонез", recommendedGrams: 15 },
        { name: "Кетчуп", recommendedGrams: 42 },
      ],
    },
    // Категорії для прийому їжі 3
    {
      id: "h",
      name: "Буква Ж",
      items: [
        { name: "Сир зернистий (творог нежирний) 0.2% жиру", recommendedGrams: 275 },
        { name: "Сири м'які, тверді, плавлені", recommendedGrams: 55 },
        { name: "Сметана 15%", recommendedGrams: 110 },
        { name: "Масло", recommendedGrams: 27 },
        { name: "Сало", recommendedGrams: 19 },
        { name: "Кефір 1%", recommendedGrams: 480 },
        { name: "Несолодкий йогурт 1% жиру", recommendedGrams: 460 },
        { name: "Молоко 1%", recommendedGrams: 490 },
      ],
    },
    {
      id: "i",
      name: "Буква З",
      items: [
        { name: "Фрукти та ягоди", recommendedGrams: 400 },
        { name: "Банани, Виноград, Хурма або Манго", recommendedGrams: 180 },
      ],
    },
    {
      id: "j",
      name: "Буква И",
      items: [
        { name: "Горіхи будь-які (рекомендуємо грецькі)", recommendedGrams: 20 },
        { name: "Насіння", recommendedGrams: 20 },
      ],
    },
    // Категорії для прийому їжі 4
    {
      id: "k",
      name: "Буква І",
      items: [
        { name: "Телятина", recommendedGrams: 160 },
        { name: "Печінка", recommendedGrams: 160 },
        { name: "Куряче або індиче філе", recommendedGrams: 190 },
        { name: "Риба (до 5% жиру)", recommendedGrams: 185 },
        { name: "Риба (від 5% жиру)", recommendedGrams: 125 },
        { name: "3 яйця", recommendedGrams: 150 },
        { name: "Морепродукти", recommendedGrams: 220 },
      ],
    },
    {
      id: "l",
      name: "Буква Ї",
      items: [
        { name: "Овочі (свіжі)", recommendedGrams: 300 },
        { name: "Овочі (квашені)", recommendedGrams: 300 },
        { name: "Зелень", recommendedGrams: 300 },
        { name: "Гриби", recommendedGrams: 300 },
      ],
    },
    {
      id: "m",
      name: "Буква Й",
      items: [
        { name: "Будь-яка олія (рекомендуємо лляну)", recommendedGrams: 12 },
        { name: "Авокадо", recommendedGrams: 65 },
        { name: "Оливки", recommendedGrams: 80 },
        { name: "Гірчиця", recommendedGrams: 28 },
        { name: "Майонез", recommendedGrams: 15 },
        { name: "Кетчуп", recommendedGrams: 42 },
      ],
    },
  ];

  const [expandedMeals, setExpandedMeals] = useState<number[]>([]);

  const toggleMealExpansion = (mealId: number) => {
    setExpandedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Прийом їжі 1",
      selections: {
        a: [],
        b: [],
        c: [],
      },
      isSaved: false,
    },
    {
      id: 2,
      name: "Прийом їжі 2",
      selections: {
        d: [],
        e: [],
        f: [],
        g: [],
      },
      isSaved: false,
    },
    {
      id: 3,
      name: "Прийом їжі 3",
      selections: {
        h: [],
        i: [],
        j: [],
      },
      isSaved: false,
    },
    {
      id: 4,
      name: "Прийом їжі 4",
      selections: {
        k: [],
        l: [],
        m: [],
      },
      isSaved: false,
    },
  ]);

  // Функція для отримання категорій для кожного прийому їжі
  const getCategoriesForMeal = (mealId: number): CategoryId[] => {
    switch (mealId) {
      case 1:
        return ["a", "b", "c"]; // Прийом їжі 1: Буква А, Б, В
      case 2:
        return ["d", "e", "f", "g"]; // Прийом їжі 2: Буква Г, Д, Е, Є
      case 3:
        return ["h", "i", "j"]; // Прийом їжі 3: Буква Ж, З, И
      case 4:
        return ["k", "l", "m"]; // Прийом їжі 4: Буква І, Ї, Й
      default:
        return ["a", "b", "c"];
    }
  };

  const isMealComplete = (selections: Selections) => {
    // Отримуємо категорії для цього прийому їжі
    const mealId = meals.find(m => m.selections === selections)?.id;
    if (!mealId) return false;
    
    const categories = getCategoriesForMeal(mealId);
    
    // Перевіряємо, чи всі категорії мають хоча б один вибір
    return categories.every(cat => selections[cat] && selections[cat]!.length > 0);
  };

  const isItemSelected = (
    mealId: number, 
    categoryId: CategoryId, 
    itemName: string
  ): { selected: boolean; portion: "full" | "half" | null } => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return { selected: false, portion: null };
    
    const selection = meal.selections[categoryId] || [];
    const foundItem = selection.find(item => item.item === itemName);
    
    if (foundItem) {
      return { selected: true, portion: foundItem.portion };
    }
    
    return { selected: false, portion: null };
  };

  const canSelectItem = (
    mealId: number,
    categoryId: CategoryId,
    itemName: string,
    portion: "full" | "half" = "full"
  ): boolean => {
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return false;
    
    const selection = meal.selections[categoryId] || [];
    
    // Якщо поточний продукт вже вибраний, перевіряємо можливість зміни порції
    const existingItemIndex = selection.findIndex(s => s.item === itemName);
    if (existingItemIndex !== -1) {
      const currentPortion = selection[existingItemIndex].portion;
      
      // Якщо порція така сама, дозволяємо вибрати для видалення
      if (currentPortion === portion) return true;
      
      // Якщо порція зараз "half" і хочемо змінити на "full"
      if (currentPortion === "half" && portion === "full") {
        // Перевіряємо, чи є інші вибрані продукти крім поточного
        const otherSelections = selection.filter((s, i) => i !== existingItemIndex);
        if (otherSelections.length > 0) return false; // Заборонено змінювати на повну, якщо є інші вибрані продукти
      }
      
      // В інших випадках дозволяємо зміну порції
      return true;
    }
    
    // Якщо нічого не вибрано, можна вибрати будь-який продукт
    if (selection.length === 0) return true;
    
    // Рахуємо загальну суму порцій в категорії
    const portionSum = calculatePortionSum(selection, categoryId);
    
    // Якщо вже вибрана повна порція (100%), не можна вибрати інші продукти
    if (portionSum >= 1) return false;
    
    // Якщо ми хочемо вибрати повну порцію, але вже є вибрані продукти, це неможливо
    if (portion === "full") return false;
    
    // Якщо хочемо вибрати половину порції, перевіряємо, чи залишилось місце
    if (portion === "half" && portionSum + 0.5 > 1) return false;
    
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
        
        const selection = [...(meal.selections[categoryId] || [])];
        const existingItemIndex = selection.findIndex(s => s.item === item.name);
        
        if (existingItemIndex !== -1) {
          // Якщо порція така сама як вже вибрана, видаляємо продукт
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
          ? {
              ...meal,
              isSaved: true,
            }
          : meal
      )
    );
    toast.success("Прийом їжі збережено!");
  };
  
  const resetMealSelections = (mealId: number) => {
    setMeals(
      meals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              selections: mealId === 1 ? { a: [], b: [], c: [] } : 
                          mealId === 2 ? { d: [], e: [], f: [], g: [] } :
                          mealId === 3 ? { h: [], i: [], j: [] } :
                          { k: [], l: [], m: [] },
              isSaved: false,
            }
          : meal
      )
    );
  };

  // Допоміжна функція для визначення, чи категорія повністю заповнена
  const isCategoryFull = (meal: Meal, categoryId: CategoryId): boolean => {
    const selections = meal.selections[categoryId] || [];
    const portionSum = calculatePortionSum(selections, categoryId);
    return portionSum >= 1;
  };

  // Функція для обчислення загального прогресу харчування
  const calculateTotalProgress = (): number => {
    let totalProgress = 0;
    
    // Проходимо по всіх прийомах їжі
    meals.forEach((meal) => {
      // Проходимо по всіх категоріях у цьому прийомі їжі
      Object.entries(meal.selections).forEach(([categoryId, selections]) => {
        if (!selections || selections.length === 0) return;
        
        // Розраховуємо прогрес в залежності від категорії та порції
        if (categoryId === 'c') {
          // Для букви В (c) - 4% за повну порцію і 2% за половину
          selections.forEach(selection => {
            if (selection.portion === "full") {
              totalProgress += 4;
            } else {
              totalProgress += 2;
            }
          });
        } else {
          // Для всіх інших категорій - 8% за повну порцію і 4% за половину
          selections.forEach(selection => {
            if (selection.portion === "full") {
              totalProgress += 8;
            } else {
              totalProgress += 4;
            }
          });
        }
      });
    });
    
    // Обмежуємо максимальне значення до 100%
    return Math.min(totalProgress, 100);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Харчування</CardTitle>
          <CardDescription>
            Оберіть продукти для кожного прийому їжі
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm">Заповнення денного раціону</div>
              <div className="text-sm font-medium">
                {calculateTotalProgress().toFixed(0)}%
              </div>
            </div>
            <Progress
              value={calculateTotalProgress()}
              className="h-2"
            />
            <div className="text-xs text-gray-500 mt-1">
              Повна порція категорії = 8% (4% для В), половина порції = 4% (2% для В)
            </div>
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
                  {getCategoriesForMeal(meal.id).map((categoryId) => {
                    const category = mealCategories.find(c => c.id === categoryId);
                    if (!category) return null;
                    
                    const selections = meal.selections[categoryId] || [];
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
                          {categoryLabels[categoryId]}: {(portionSum * 100).toFixed(0)}%
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
                          {categoryLabels[categoryId]}: не вибрано
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
                  {mealCategories
                    .filter(category => getCategoriesForMeal(meal.id).includes(category.id as CategoryId))
                    .map((category) => {
                      const categoryId = category.id as CategoryId;
                      const selections = meal.selections[categoryId] || [];
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
                              const categoryFull = isCategoryFull(meal, categoryId);
                              const isDisabled = categoryFull && !selected;
                              
                              return (
                                <div
                                  key={item.name}
                                  className={cn(
                                    "relative flex flex-col border rounded-lg p-3 transition-all overflow-hidden",
                                    selected
                                      ? "border-green-500 shadow-sm"
                                      : canSelect
                                      ? "border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer"
                                      : "border-gray-200"
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
                                    <div className={cn(
                                      "text-center font-medium line-clamp-2 h-auto mb-2",
                                      isDisabled && "opacity-50"
                                    )}>
                                      {item.name}
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant={selected && portion === "half" ? "default" : "outline"}
                                        className={cn(
                                          "flex items-center justify-center",
                                          !canSelectItem(meal.id, categoryId, item.name, "half") && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!canSelectItem(meal.id, categoryId, item.name, "half")}
                                        onClick={() => handleSelectItem(meal.id, categoryId, item, "half")}
                                      >
                                        <span className="text-xs">половина порції ({Math.round(item.recommendedGrams / 2)} г)</span>
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant={selected && portion === "full" ? "default" : "outline"}
                                        className={cn(
                                          "flex items-center justify-center",
                                          !canSelectItem(meal.id, categoryId, item.name, "full") && "opacity-50 cursor-not-allowed"
                                        )}
                                        disabled={!canSelectItem(meal.id, categoryId, item.name, "full")}
                                        onClick={() => handleSelectItem(meal.id, categoryId, item, "full")}
                                      >
                                        <span className="text-xs">ціла порція ({item.recommendedGrams} г)</span>
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

