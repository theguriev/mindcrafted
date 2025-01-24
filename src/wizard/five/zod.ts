import { z } from "zod";

export const weight = z.number();

export const formSchema = z.object({
  weight,
});

export type FormSchema = z.infer<typeof formSchema>;
