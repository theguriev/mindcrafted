import { z } from "zod";

export const endocrineDisorders = z.string();

export const formSchema = z.object({
  endocrineDisorders,
});

export type FormSchema = z.infer<typeof formSchema>;
