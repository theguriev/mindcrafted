import { z } from "zod";

export const gaveBirth = z.date();

export const formSchema = z.object({
  gaveBirth,
});

export type FormSchema = z.infer<typeof formSchema>;
