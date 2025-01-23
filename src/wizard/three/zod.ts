import { z } from "zod";

export const birthday = z.date();

export const formSchema = z.object({
  birthday,
});

export type FormSchema = z.infer<typeof formSchema>;
