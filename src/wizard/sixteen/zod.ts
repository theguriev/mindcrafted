import { z } from "zod";

export const foodIntolerances = z.string();

export const formSchema = z.object({
  foodIntolerances,
});

export type FormSchema = z.infer<typeof formSchema>;
