import type React from "react";

import { ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import type { CategoryInfo, IngredientInfo } from "./types";

interface CategorySelectorProps {
  mealId: number;
  category: CategoryInfo;
  selection: { item: string; grams: number; portion: "whole" | "half" } | null;
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

export function CategorySelector({
  mealId,
  category,
  selection,
  openPopover,
  setOpenPopover,
  onSelectItem,
}: CategorySelectorProps) {
  const categoryKey = `${mealId}-${category.id}`;

  const getPortionText = (portion: "whole" | "half") => {
    return portion === "whole"
      ? "Повна порція (100%)"
      : "Половина порції (50%)";
  };

  return (
    <div>
      <div className="mb-2">
        <h3 className="font-medium">
          Категорія {category.id.toUpperCase()} - {category.description}
        </h3>
      </div>

      {selection ? (
        <SelectedItem
          categoryKey={categoryKey}
          selection={selection}
          category={category}
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          onSelectItem={(item, portion) =>
            onSelectItem(mealId, category.id as "a" | "b" | "c", item, portion)
          }
          getPortionText={getPortionText}
        />
      ) : (
        <ItemSelector
          categoryKey={categoryKey}
          category={category}
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
          onSelectItem={(item, portion) =>
            onSelectItem(mealId, category.id as "a" | "b" | "c", item, portion)
          }
        />
      )}

      {category.id !== "c" && <Separator className="my-4" />}
    </div>
  );
}

interface SelectedItemProps {
  categoryKey: string;
  selection: { item: string; grams: number; portion: "whole" | "half" };
  category: CategoryInfo;
  openPopover: { [key: string]: boolean };
  setOpenPopover: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  onSelectItem: (item: IngredientInfo, portion: "whole" | "half") => void;
  getPortionText: (portion: "whole" | "half") => string;
}

function SelectedItem({
  categoryKey,
  selection,
  category,
  openPopover,
  setOpenPopover,
  onSelectItem,
  getPortionText,
}: SelectedItemProps) {
  return (
    <Popover
      open={openPopover[categoryKey]}
      onOpenChange={(open) => {
        setOpenPopover({ ...openPopover, [categoryKey]: open });
      }}
    >
      <PopoverTrigger asChild>
        <div
          className="w-full p-3 border rounded-md bg-muted/50 hover:bg-muted cursor-pointer transition-colors flex items-center justify-between"
          role="button"
          tabIndex={0}
          onClick={() =>
            setOpenPopover({ ...openPopover, [categoryKey]: true })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpenPopover({ ...openPopover, [categoryKey]: true });
              e.preventDefault();
            }
          }}
        >
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium truncate">{selection.item}</span>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {selection.grams}г - {getPortionText(selection.portion)}
            </span>
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50 flex-shrink-0 ml-2" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <ItemCommandMenu category={category} onSelectItem={onSelectItem} />
      </PopoverContent>
    </Popover>
  );
}

interface ItemSelectorProps {
  categoryKey: string;
  category: CategoryInfo;
  openPopover: { [key: string]: boolean };
  setOpenPopover: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  onSelectItem: (item: IngredientInfo, portion: "whole" | "half") => void;
}

function ItemSelector({
  categoryKey,
  category,
  openPopover,
  setOpenPopover,
  onSelectItem,
}: ItemSelectorProps) {
  return (
    <Popover
      open={openPopover[categoryKey]}
      onOpenChange={(open) => {
        setOpenPopover({ ...openPopover, [categoryKey]: open });
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openPopover[categoryKey]}
          className="w-full justify-between"
        >
          {`Оберіть ${category.description.toLowerCase()}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <ItemCommandMenu category={category} onSelectItem={onSelectItem} />
      </PopoverContent>
    </Popover>
  );
}

interface ItemCommandMenuProps {
  category: CategoryInfo;
  onSelectItem: (item: IngredientInfo, portion: "whole" | "half") => void;
}

function ItemCommandMenu({ category, onSelectItem }: ItemCommandMenuProps) {
  return (
    <Command>
      <CommandInput
        placeholder={`Пошук ${category.description.toLowerCase()}...`}
      />
      <CommandList>
        <CommandEmpty>Інгредієнт не знайдено.</CommandEmpty>
        <CommandGroup heading="Повні порції (100%)">
          {category.items.map((item) => (
            <CommandItem
              key={`${item.name}-whole`}
              value={`${item.name}-whole`}
              onSelect={() => onSelectItem(item, "whole")}
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
              onSelect={() => onSelectItem(item, "half")}
              className="flex justify-between"
            >
              <span>{item.name}</span>
              <span className="text-muted-foreground">
                {Math.round(item.recommendedGrams * 0.5)}г
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
