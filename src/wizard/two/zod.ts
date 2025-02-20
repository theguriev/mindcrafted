import { z } from "zod";

export const lastName = z.string().min(3).max(20);

export const formSchema = z.object({
  lastName,
});

export type FormSchema = z.infer<typeof formSchema>;
