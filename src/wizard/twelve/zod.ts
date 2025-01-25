import { z } from "zod";

export const eatingDisorder = z.string();

export const formSchema = z.object({
  eatingDisorder,
});

export type FormSchema = z.infer<typeof formSchema>;
