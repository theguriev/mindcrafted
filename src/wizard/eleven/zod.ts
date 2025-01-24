import { z } from "zod";

export const contraindications = z.string();

export const formSchema = z.object({
  contraindications,
});

export type FormSchema = z.infer<typeof formSchema>;
