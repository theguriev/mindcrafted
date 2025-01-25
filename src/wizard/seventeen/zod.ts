import { z } from "zod";

export const goal = z.string();

export const formSchema = z.object({
  goal,
});

export type FormSchema = z.infer<typeof formSchema>;
