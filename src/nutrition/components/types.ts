export type IngredientInfo = {
  name: string;
  recommendedGrams: number;
};

export type CategoryInfo = {
  id: string;
  name: string;
  description: string;
  items: IngredientInfo[];
};

export type Selection = {
  a: { item: string; grams: number; portion: "whole" | "half" } | null;
  b: { item: string; grams: number; portion: "whole" | "half" } | null;
  c: { item: string; grams: number; portion: "whole" | "half" } | null;
};

export type Meal = {
  id: number;
  name: string;
  selections: Selection;
};
