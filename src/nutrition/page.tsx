import { Check, ChevronsUpDown, Scale, X } from "lucide-react";
import { type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Selection = {
  a: { item: string; grams: number; portion: "whole" | "half" } | null;
  b: { item: string; grams: number; portion: "whole" | "half" } | null;
  c: { item: string; grams: number; portion: "whole" | "half" } | null;
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

  const getPortionText = (portion: "whole" | "half") => {
    return portion === "whole"
      ? "Повна порція (100%)"
      : "Половина порції (50%)";
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
        <CardFooter className="bg-muted/30 border-t pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Scale className="h-4 w-4" />
            <span>
              Всі ваги вказані для сирих продуктів. Не перевищуйте рекомендовані
              порції.
            </span>
          </div>
        </CardFooter>
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
                      ({meal.selections.a?.grams}г -{" "}
                      {getPortionText(meal.selections.a?.portion || "whole")})
                    </div>
                    <div className="text-sm">
                      Категорія B:{" "}
                      <span className="font-medium">
                        {meal.selections.b?.item}
                      </span>{" "}
                      ({meal.selections.b?.grams}г -{" "}
                      {getPortionText(meal.selections.b?.portion || "whole")})
                    </div>
                    <div className="text-sm">
                      Категорія C:{" "}
                      <span className="font-medium">
                        {meal.selections.c?.item}
                      </span>{" "}
                      ({meal.selections.c?.grams}г -{" "}
                      {getPortionText(meal.selections.c?.portion || "whole")})
                    </div>
                  </div>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {!isMealComplete(meal.selections) ? (
                <div className="space-y-4">
                  {mealCategories.map((category) => {
                    const categoryKey = `${meal.id}-${category.id}`;
                    const selection =
                      meal.selections[category.id as keyof Selection];

                    return (
                      <div key={category.id}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            Категорія {category.id.toUpperCase()} -{" "}
                            {category.description}
                          </h3>
                          {selection && (
                            <Badge variant="secondary">
                              Обрано: {selection.item} ({selection.grams}г)
                            </Badge>
                          )}
                        </div>

                        {selection ? (
                          <div className="flex items-center justify-between gap-2">
                            <Popover
                              open={openPopover[categoryKey]}
                              onOpenChange={(open) => {
                                setOpenPopover({
                                  ...openPopover,
                                  [categoryKey]: open,
                                });
                              }}
                            >
                              <PopoverTrigger asChild>
                                <div
                                  className="flex-1 p-3 border rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors flex items-center justify-between"
                                  role="button"
                                  tabIndex={0}
                                  onClick={() =>
                                    setOpenPopover({
                                      ...openPopover,
                                      [categoryKey]: true,
                                    })
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      setOpenPopover({
                                        ...openPopover,
                                        [categoryKey]: true,
                                      });
                                      e.preventDefault();
                                    }
                                  }}
                                >
                                  <div>
                                    <div className="font-medium">
                                      {selection.item}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {selection.grams}г -{" "}
                                      {getPortionText(selection.portion)}
                                    </div>
                                  </div>
                                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-[300px] p-0">
                                <Command>
                                  <CommandInput
                                    placeholder={`Пошук ${category.description.toLowerCase()}...`}
                                  />
                                  <CommandList>
                                    <CommandEmpty>
                                      Інгредієнт не знайдено.
                                    </CommandEmpty>
                                    <CommandGroup heading="Повні порції (100%)">
                                      {category.items.map((item) => (
                                        <CommandItem
                                          key={`${item.name}-whole`}
                                          value={`${item.name}-whole`}
                                          onSelect={() =>
                                            handleSelectItem(
                                              meal.id,
                                              category.id as "a" | "b" | "c",
                                              item,
                                              "whole"
                                            )
                                          }
                                          className="flex justify-between"
                                        >
                                          <span>{item.name}</span>
                                          <span className="text-muted-foreground">
                                            {item.recommendedGrams}г
                                          </span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                    <CommandGroup heading="Половинні порції (50%)">
                                      {category.items.map((item) => (
                                        <CommandItem
                                          key={`${item.name}-half`}
                                          value={`${item.name}-half`}
                                          onSelect={() =>
                                            handleSelectItem(
                                              meal.id,
                                              category.id as "a" | "b" | "c",
                                              item,
                                              "half"
                                            )
                                          }
                                          className="flex justify-between"
                                        >
                                          <span>{item.name}</span>
                                          <span className="text-muted-foreground">
                                            {Math.round(
                                              item.recommendedGrams * 0.5
                                            )}
                                            г
                                          </span>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                clearSelection(
                                  meal.id,
                                  category.id as "a" | "b" | "c"
                                )
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Popover
                            open={openPopover[categoryKey]}
                            onOpenChange={(open) => {
                              setOpenPopover({
                                ...openPopover,
                                [categoryKey]: open,
                              });
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openPopover[categoryKey]}
                                className="w-full justify-between"
                              >
                                {selection
                                  ? selection.item
                                  : `Оберіть ${category.description.toLowerCase()}`}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput
                                  placeholder={`Пошук ${category.description.toLowerCase()}...`}
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    Інгредієнт не знайдено.
                                  </CommandEmpty>
                                  <CommandGroup heading="Повні порції (100%)">
                                    {category.items.map((item) => (
                                      <CommandItem
                                        key={`${item.name}-whole`}
                                        value={`${item.name}-whole`}
                                        onSelect={() =>
                                          handleSelectItem(
                                            meal.id,
                                            category.id as "a" | "b" | "c",
                                            item,
                                            "whole"
                                          )
                                        }
                                        className="flex justify-between"
                                      >
                                        <span>{item.name}</span>
                                        <span className="text-muted-foreground">
                                          {item.recommendedGrams}г
                                        </span>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                  <CommandGroup heading="Половинні порції (50%)">
                                    {category.items.map((item) => (
                                      <CommandItem
                                        key={`${item.name}-half`}
                                        value={`${item.name}-half`}
                                        onSelect={() =>
                                          handleSelectItem(
                                            meal.id,
                                            category.id as "a" | "b" | "c",
                                            item,
                                            "half"
                                          )
                                        }
                                        className="flex justify-between"
                                      >
                                        <span>{item.name}</span>
                                        <span className="text-muted-foreground">
                                          {Math.round(
                                            item.recommendedGrams * 0.5
                                          )}
                                          г
                                        </span>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        )}

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
